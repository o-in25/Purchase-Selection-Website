$(function()
{
    hideElements();
    $('#back').hide();
    var dataToggle = null;
    var activeElement = null;
    const INCREMENT_BY_ONE = 1;
    const INCREMENT_BY_TWO = 2;
    const INCREMENT_BY_THREE = 3;
    const INCREMENT_BY_ONE_HUNDRED = 100;
    const INCREMENT_BY_THREE_HUNDRED = 300;
    const INCREMENT_BY_FIVE_HUNDRED = 500;
    const PARENT = "parent";
    const RESIDENT = "resident";
    const COMMUTER = "commuter";
    var $parent = $("#link-parent");
    var $resident = $("#link-resident");
    var $commuter = $("#link-commuter");
    var $short = $('#short');
    var $long = $('#long');
    var $one = $('#1');
    var $two = $('#2');
    var $three = $('#3');
    var $four = $('#4');
    var $five = $('#5');
    var $close = $('#close');
    var shortRowData = [$one, $two, $three];
    var isLastStep = false;
    var steps = 0;
    var choice = new Choice();
    var elements = [
        'table-header-1',
        'table-id-1-1',
        'table-id-1-2',
        'table-id-1-3',
        'table-id-1-4',
        'table-id-1-5',
        'table-header-2',
        'table-id-2-1',
        'table-id-2-2',
        'table-id-2-3',
        'table-id-2-4',
        'table-id-2-5',
        'table-header-3',
        'table-id-3-1',
        'table-id-3-2',
        'table-id-3-3',
        'table-id-3-4',
        'table-id-3-5'
    ];


    function Choice()
    {
        this.clicked = 0;
        this.currentScreen = null;

        this.increment = function(value)
        {
            this.clicked += value;
        };

        this.decrement = function()
        {
            steps -= 1;
        };
    }

    function menuSelection(clicked)
    {
        var data = "";
        var number = clicked.toString();
        var prefix = number.substring(0, 1);
        var suffix = number.substring(1, number.length);
        var prefixInt = parseInt(prefix);
        var suffixInt = parseInt(suffix);
        var silver = ["Xavier Silver Plan", "Heavy Eater", "Rarely Go Home", "Eat 3 Meals a Day", "Unlimited Swipes", "$100 Dining Dollars"];
        var blue = ["Xavier Blue Plan", "Heavy to Moderate Eater", "Rarely Go Home", "Eat 2 Meals a Day", "Unlimited Swipes", "$250 Dining Dollars"];
        var white = ["Xavier White Plan", "Moderate Eater", "Sometimes Go Home", "Eat 1 Meal a Day", "225 Swipes", "$100 Dining Dollars"];
        var eighty = ["80 Block", "Heavy to Average Eater", "Go Home Occasionally", "Eat 3 Meals a Day", "80 Swipes", "$150 Dining Dollars"];
        var fourty = ["40 Block", "Average Eater", "Go Home Often", "40 Swipes", "Eat 3 Meals a Day", "$150 Dining Dollars"];
        var twenty = ["25 Block", "Light Eater", "Go Home Everyday", "25 Swipes", "Eat 1 Meal a Day", "$150 Dining Dollars"];
        if(dataToggle == RESIDENT)
        {
            if(prefixInt < 2 || suffixInt == 2)
            {
                data = "B";
            }
            else
            {
                data = "A";
            }
        }
        else if(dataToggle == COMMUTER)
        {

            if(prefixInt < 2 || suffixInt == 2)
            {
                data = "Z";
            }
            else if(prefixInt < 4 || suffixInt == 4)
            {
                data = "Y";
            }
            else if(prefix < 6 && suffix == 6)
            {
                data = "Special Case";
            }
            else
            {
                data = "X";
            }
        }
        if(data == "A")
        {
            activeElement = [silver, white, blue];
        }
        else if(data == "B")
        {
            activeElement = [white, silver, blue];
        }
        else if(data == "X")
        {
            activeElement = [eighty, fourty, twenty];
        }
        else if(data == "Y")
        {
            activeElement = [fourty, eighty, twenty];
        }
        else if(data == "Z")
        {
            activeElement = [twenty, fourty, eighty];
        }
        else if(data = "Special Case")
        {
            activeElement = [white, eighty, fourty];
        }
    }

    function processCommand(array)
    {
        var k = 0;
        for(var i = 0; i < array.length; i++)
        {
            for(var j = 0; j < array[i].length; j++)
            {
                document.getElementById(elements[k]).innerText = array[i][j];
                k++;
            }
        }
    }

    $('#modal-1').on('click', function()
    {
        var i = 0;
        while(i < elements.length)
        {
            elements[i].text("");
            i++;
        }
    });


    function hideElements()
    {
        $('#short').hide();
        $('#long').hide();
    }


    function clear()
    {
        $one.empty();
        $two.empty();
        $three.empty();
        $four.empty();
        $parent.removeClass('added');
        $resident.removeClass('added');
        $commuter.removeClass('added');
        hideElements();
    }


    $parent.on('click', function()
    {
        $('#back').hide();
        choice.decrement();
        steps = 0;
        if(choice.currentScreen != $parent)
        {
            dataToggle = PARENT;
            clear();
            $(this).addClass('added');
            var fieldsZero = ["<h4 class=\"text-align text-align-wrap-content\">FAQ</h4><i class=\"fa fa-question-circle\"></i>","<h4 class=\"text-align text-align-wrap-content\">Browse</h4><i class=\"fa fa-shopping-cart\"></i>","<h4 class=\"text-align text-align-wrap-content\">Purchase</h4><i class=\"fa fa-money\"></i>"];
            for(var i = 0; i < shortRowData.length; i++)
            {
                shortRowData[i].append(fieldsZero[i]);
            }
            $short.fadeIn(200);
        }
        choice.currentScreen = $parent;
        return false;
    });

    $resident.on('click', function()
    {
        // 2 windows can't both clicked on at once
        $('#back').hide();
        choice.decrement();
        steps = 0;
        if(choice.currentScreen != $resident)
        {
            dataToggle = RESIDENT;
            clear();
            // CSS purposes
            $(this).addClass('added');
            // AJAX request
            $four.append("<h4 class=\"text-align text-align-wrap-content\">Find The Best Meal Plan For Me</h4><i class=\"fa fa-list\"></i>");
            $long.fadeIn(200);
        }
        choice.currentScreen = $resident;
        return false;
    });

    $commuter.on('click', function()
    {
        // 2 windows can't both clicked on at once
        steps = 0;
        $('#back').hide();
        choice.decrement();
        if(choice.currentScreen != $commuter)
        {
            dataToggle = COMMUTER;
            clear();
            $(this).addClass('added');
            $four.append("<h4 class=\"text-align text-align-wrap-content\">Find The Best Meal Plan For Me</h4><i class=\"fa fa-list\"></i>");
            $long.fadeIn(200);
        }
        choice.currentScreen = $commuter;
        return false;
    });

    $('#content-modal').on('hidden.bs.modal', function()
    {
        clear();
    });

    $one.on('click', function()
    {
        clear();
        if(isLastStep == true)
        {
            choice.increment(INCREMENT_BY_FIVE_HUNDRED);
        }
        else
        {
            choice.increment(INCREMENT_BY_THREE)
        }
        loadNextScreen();

    });

    $two.on('click', function()
    {
        clear();
        if(isLastStep == true)
        {
            choice.increment(INCREMENT_BY_THREE_HUNDRED);
        }
        else
        {
            choice.increment(INCREMENT_BY_TWO);
        }
        if(dataToggle == PARENT)
        {
            loadAll();
        }
        else
        {
            loadNextScreen();
        }

    });

    $three.on('click', function()
    {
        clear();
        if(isLastStep == true)
        {
            choice.increment(INCREMENT_BY_ONE_HUNDRED);
        }
        else
        {
            choice.increment(INCREMENT_BY_ONE);
        }
        loadNextScreen();

    });

    $four.on('click', function()
    {
        clear();
        loadNextScreen();
        $('#back').fadeIn(200);

    });



    function step(html, data, boolean)
    {
        isLastStep = boolean;
        for(var j = 0; j < shortRowData.length; j++)
        {
            data[j].append(html[j]);
        }
        $short.fadeIn(200);
        steps++;
    }

    function finalStep()
    {
        menuSelection(choice.clicked);
        processCommand(activeElement);
        isLastStep = false;
        $('#content-modal').modal('show');
        hideBackButton();
        choice.currentScreen = null
    }

    function loadNextScreen()
    {

        if(steps == 0)
        {
            steps++;
        }
        else if(steps == 1)
        {
            step(['<h4 class=\"text-align text-align-wrap-content\">Big Eater</h4><i class=\"fa fa-cutlery\"></i>','<h4 class=\"text-align text-align-wrap-content\">Average Eater</h4><i class=\"fa fa-cutlery\"></i>','<h4 class=\"text-align text-align-wrap-content\">Small Eater</h4><i class=\"fa fa-cutlery\"></i>'], shortRowData, false, 100)
        }
        else if(steps == 2)
        {
            step(['<h4 class=\"text-align text-align-wrap-content\">Go Home Rarely</h4><i class=\"fa fa-home\"></i>','<h4 class=\"text-align text-align-wrap-content\">Go Home Occasionally</h4><i class=\"fa fa-home\"></i>','<h4 class=\"text-align text-align-wrap-content\">Go Home Frequently</h4><i class=\"fa fa-home\"></i>'], shortRowData, false, 100)
        }
        else if(steps == 3)
        {
            step(['<h4 class=\"text-align text-align-wrap-content\">Eat 3 Meals a Day</h4><i class=\"fa fa-clock-o\"></i>','<h4 class=\"text-align text-align-wrap-content\">Eat 2 Meals a Day</h4><i class=\"fa fa-clock-o\"></i>','<h4 class=\"text-align text-align-wrap-content\">Eat 1 Meal a Day</h4><i class=\"fa fa-clock-o\"></i>'], shortRowData, true, 100)
        }
        else if(steps == 4)
        {
            finalStep();
        }
    }

    $four.on('click', function()
    {
        clear();
        $('#back').fadeIn(200);
        loadNextScreen();

    });

    function loadAll()
    {
        $('#content-modal-2').modal('show');
    }

    function hideBackButton()
    {
        $('#back').fadeOut(500);
    }

    $five.on('click', function()
    {
        choice.decrement();
        loadNextScreen();
    });


    $close.on('click', function()
    {
        window.location.reload();
    });


    $('a').click(function ()
    {
        var x = window.pageXOffset,
            y = window.pageYOffset;
        $(window).one('scroll', function ()
        {
            window.scrollTo(x, y);
        })
    });
});