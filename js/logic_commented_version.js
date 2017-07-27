/**
 *  Meal Plan Information Page
 *  @Version: 1.0b
 *  @Author: Eoin Halligan
 *  @Date: 06/16/16
 */


/**
 * Function
 * Document ready function. Fires
 * when the DOM is ready
 * @parameter callback
 * @return none
 */
$(function()
{
    // The first step is to hide the content area
    hideElements();
    $('#back').hide();
    var dataToggle = null;
    // Which Menu we are going to implement
    var activeElement = null;
    // Some predefined constants
    const INCREMENT_BY_ONE = 1;
    const INCREMENT_BY_TWO = 2;
    const INCREMENT_BY_THREE = 3;
    const INCREMENT_BY_ONE_HUNDRED = 100;
    const INCREMENT_BY_THREE_HUNDRED = 300;
    const INCREMENT_BY_FIVE_HUNDRED = 500;
    const PARENT = "parent";
    const RESIDENT = "resident";
    const COMMUTER = "commuter";
    // jQuery Objects
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
    // The last question is weighted more. Boolean flag
    var isLastStep = false;
    // Steps start at 0
    var steps = 0;
    // The user's choice
    var choice = new Choice();
    // DOM elements
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

    /** Object
     *
     * @constructor Creates a new Choice object, which will represent what the user clicks.
     * Based on what the user clicks, a different constant is used to increment the counter
     */
    function Choice()
    {
        this.clicked = 0;
        this.data = [1, 2, 3];
        this.currentScreen = null;
        /** Function
         *  Increments clicked by the constant, 1
         */
        this.incrementByOne = function()
        {
            this.clicked += INCREMENT_BY_ONE;
        };
        /** Function
         *  Increments clicked by the constant, 2
         */
        this.incrementByTwo = function()
        {
            this.clicked += INCREMENT_BY_TWO;

        };
        /** Function
         *  Increments clicked by the constant, 3
         */
        this.incrementByThree = function()
        {
            this.clicked += INCREMENT_BY_THREE;
        };

        this.incrementByOneHundred = function()
        {
            this.clicked += INCREMENT_BY_ONE_HUNDRED;

        };
        this.incrementByThreeHundred = function()
        {
            this.clicked += INCREMENT_BY_THREE_HUNDRED;

        };
        this.incrementByFiveHundred = function()
        {
            this.clicked += INCREMENT_BY_FIVE_HUNDRED;

        };
        /** Function
         *  Decrements clicked
         */
        this.decrement = function()
        {
            this.clicked = 0;
        };
    }

    /** Object
     *
     * @constructor Creates a new MenuSelection object, which will determine which
     *  request to call to display the menu. It will return a token, to which, the
     * request will compare, and will display accordingly.
     * @parameter a number of clicks
     */
    function menuSelection(clicked)
    {
        // String flag, determines the choice
        var data = "";
        // Integer is converted into a String to use subString()
        var number = clicked.toString();
        var prefix = number.substring(0, 1);
        var suffix = number.substring(1, number.length);
        // Once we have the substrings, it is converted back to an Integer form
        // HTML index
        var prefixInt = parseInt(prefix);
        var suffixInt = parseInt(suffix);
        var silver = ["Xavier Silver Plan", "Heavy Eater", "Rarely Go Home", "Eat 3 Meals a Day", "Unlimited Swipes", "$100 Dining Dollars"];
        var blue = ["Xavier Blue Plan", "Heavy to Moderate Eater", "Rarely Go Home", "Eat 2 Meals a Day", "Unlimited Swipes", "$250 Dining Dollars"];
        var white = ["Xavier White Plan", "Moderate Eater", "Sometimes Go Home", "Eat 1 Meal a Day", "225 Swipes", "$100 Dining Dollars"];
        var eighty = ["80 Block", "Heavy to Average Eater", "Go Home Occasionally", "Eat 3 Meals a Day", "80 Swipes", "$150 Dining Dollars"];
        var fourty = ["40 Block", "Average Eater", "Go Home Often", "40 Swipes", "Eat 3 Meals a Day", "$150 Dining Dollars"];
        var twenty = ["25 Block", "Light Eater", "Go Home Everyday", "25 Swipes", "Eat 1 Meal a Day", "$150 Dining Dollars"];
        // First, the resident
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
        // Now, the commuter
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
            // Unlimited
            activeElement = [silver, white, blue];
        }
        else if(data == "B")
        {
            // 225
            activeElement = [white, silver, blue];
        }
        else if(data == "X")
        {
            // 80
            activeElement = [eighty, fourty, twenty];
        }
        else if(data == "Y")
        {
            // 40
            activeElement = [fourty, eighty, twenty];
        }
        else if(data == "Z")
        {
            // 25
            activeElement = [twenty, fourty, eighty];
        }
        else if(data = "Special Case")
        {
            // White
            activeElement = [white, eighty, fourty];
        }
    }

    /**
     * Function
     * Appends the contents of an array
     * into the modal via a 2D array
     * @parameter array
     * @return none
     */
    function processCommand(array)
    {
        // Index in elements[k]
        var k = 0;
        // First, the first array in within the array
        // Index in array[i]
        for(var i = 0; i < array.length; i++)
        {
            // Index in array[i][k]
            for(var j = 0; j < array[i].length; j++)
            {
                // Gets the DOM element
                document.getElementById(elements[k]).innerText = array[i][j];
                k++;
            }
        }
    }

    /**
     * Function
     * Clears the modal, on close
     * @parameter event, callback
     * @return none
     */
    $('#modal-1').on('click', function()
    {
        var i = 0;
        while(i < elements.length)
        {
            elements[i].text("");
            i++;
        }
    });

    /** Function
     *
     *  Hides the elements that will be appended by AJAX
     *  @parameter none
     *  @return none
     */
    function hideElements()
    {
        $('#short').hide();
        $('#long').hide();
    }

    /** Function
     *
     *  Shows the elements that will be appended by AJAX
     *  @parameter none
     *  @return none
     */
    function showElements()
    {
        $('#short').show();
        $('#long').show();
        $('#back').show();
    }

    /** Function
     *
     *  Clears all of the content areas, and removes the classes
     *  that are highlighted
     *  @parameter none
     *  @return none
     */
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

    /** Function --> $PARENT
     *
     *  Will dynamically load the new window pane via
     *  an AJAX request. First, it verifies that no
     *  other choice is selected. Next, it will
     *  grab the request from a JSON file, and will
     *  append it to the screen. Finally, it will fade
     *  the new content in.
     *  @parameter event, callback
     *  @return none
     */
    $parent.on('click', function(e)
    {
        // 2 windows can't both clicked on at once
        $('#back').hide();
        choice.decrement();
        steps = 0;
        if(choice.currentScreen != $parent)
        {
            dataToggle = PARENT;
            clear();
            // CSS purposes
            $(this).addClass('added');
            var fieldsZero = ["<h4 class=\"text-align text-align-wrap-content\">FAQ</h4><i class=\"fa fa-question-circle\"></i>","<h4 class=\"text-align text-align-wrap-content\">Browse</h4><i class=\"fa fa-shopping-cart\"></i>","<h4 class=\"text-align text-align-wrap-content\">Purchase</h4><i class=\"fa fa-money\"></i>"];
            for(var i = 0; i < shortRowData.length; i++)
            {
                shortRowData[i].append(fieldsZero[i]);
            }
            $short.fadeIn(200);
        }
        // Sets the current choice
        choice.currentScreen = $parent;
        return false;
    });

    /** Function --> $RESIDENT
     *
     *  Will dynamically load the new window pane via
     *  an AJAX request. First, it verifies that no
     *  other choice is selected. Next, it will
     *  grab the request from a JSON file, and will
     *  append it to the screen. Finally, it will fade
     *  the new content in.
     *  @parameter event, callback
     *  @return none
     */
    $resident.on('click', function(e)
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

    /** Function --> $COMMUTER
     *
     *  Will dynamically load the new window pane via
     *  an AJAX request. First, it verifies that no
     *  other choice is selected. Next, it will
     *  grab the request from a JSON file, and will
     *  append it to the screen. Finally, it will fade
     *  the new content in.
     *  @parameter event, callback
     *  @return none
     */
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
            // CSS purposes
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

    /** Function --> $4
     *
     *  Will confirm the user wishes to enter into the meal plan
     *  ordering process
     *  @parameter event, callback
     *  @return none
     */
    $one.on('click', function(e)
    {
        clear();
        if(isLastStep == true)
        {
            choice.incrementByFiveHundred();
        }
        else
        {
            choice.incrementByThree()
        }
        if(dataToggle == PARENT)
        {

        }
        loadNextScreen();

    });

    /** Function --> $4
     *
     *  Will confirm the user wishes to enter into the meal plan
     *  ordering process
     *  @parameter event, callback
     *  @return none
     */
    $two.on('click', function(e)
    {
        clear();
        if(isLastStep == true)
        {
            choice.incrementByThreeHundred();
        }
        else
        {
            choice.incrementByTwo();
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


    /**
     * Function
     *
     * Will redirect the user to the appropriate window, either to purchase
     * or for FAQS
     *
     * @parameter string
     * @return none
     */
    function redirect(token)
    {
        if(token == 'purchase')
        {
           // var window = window.open(url, '_blank');
           // window.focus();
        }
        else if(token == 'faq')
        {
            // var window = window.open(url, '_blank');
            // window.focus();
        }
    }

    /** Function --> $4
     *
     *  Will confirm the user wishes to enter into the meal plan
     *  ordering process
     *  @parameter event, callback
     *  @return none
     */
    $three.on('click', function(e)
    {
        clear();
        if(isLastStep == true)
        {
            choice.incrementByOneHundred();
        }
        else
        {
            choice.incrementByOne();
        }
        if(dataToggle == PARENT)
        {

        }
        loadNextScreen();

    });
    /** Function --> $4
     *
     *  Will confirm the user wishes to enter into the meal plan
     *  ordering process
     *  @parameter event, callback
     *  @return none
     */
    $four.on('click', function(e)
    {
        clear();
        loadNextScreen();
        $('#back').fadeIn(200);

    });

    /** Function
     *
     *  Will load the next anticipated screen into effect.
     *
     *  @parameter none
     *  @return none
     */
    function loadNextScreen()
    {

        // Steps are added by a listener, and the first initial step is 0
        // Step 0
        if(steps == 0)
        {
            steps++;
        }
        // Step 1
        else if(steps == 1)
        {
            var fieldsOne = ["<h4 class=\"text-align text-align-wrap-content\">Big Eater</h4><i class=\"fa fa-cutlery\"></i>","<h4 class=\"text-align text-align-wrap-content\">Average Eater</h4><i class=\"fa fa-cutlery\"></i>","<h4 class=\"text-align text-align-wrap-content\">Small Eater</h4><i class=\"fa fa-cutlery\"></i>"];
            for(var j = 0; j < shortRowData.length; j++)
            {
                shortRowData[j].append(fieldsOne[j]);
            }
            $short.fadeIn(200);
            steps++;
        }
        // Step 2
        else if(steps == 2)
        {
            var fieldsTwo = ["<h4 class=\"text-align text-align-wrap-content\">Go Home Rarely</h4><i class=\"fa fa-home\"></i>","<h4 class=\"text-align text-align-wrap-content\">Go Home Occasionally</h4><i class=\"fa fa-home\"></i>","<h4 class=\"text-align text-align-wrap-content\">Go Home  Frequently</h4><i class=\"fa fa-home\"></i>"];
            for(var k = 0; k < shortRowData.length; k++)
            {
                shortRowData[k].append(fieldsTwo[k]);
            }
            $short.fadeIn(200);
            steps++;
        }
        // Step 3
        else if(steps == 3)
        {
            var fieldsZero = ["<h4 class=\"text-align text-align-wrap-content\">Eat 3 Meals a Day</h4><i class=\"fa fa-clock-o\"></i>","<h4 class=\"text-align text-align-wrap-content\">Eat 2 Meals a Day</h4><i class=\"fa fa-clock-o\"></i>","<h4 class=\"text-align text-align-wrap-content\">Eat 1 Meal a Day</h4><i class=\"fa fa-clock-o\"></i>"];
            for(var i = 0; i < shortRowData.length; i++)
            {
                shortRowData[i].append(fieldsZero[i]);
            }
            $short.fadeIn(200);
            steps++;
            isLastStep = true;
        }
        // Step 4
        else if(steps == 4)
        {
            var temp = choice.clicked;
            menuSelection(temp);
            processCommand(activeElement);
            isLastStep = false;
            $('#content-modal').modal('show');
            hideBackButton();
            choice.currentScreen = null;
        }
    }

    /** Function --> $4
     *
     *  Will confirm the user wishes to enter into the meal plan
     *  ordering process
     *  @parameter event, callback
     *  @return none
     */
    $four.on('click', function(e)
    {
        clear();
        $('#back').fadeIn(200);
        loadNextScreen();

    });

    /** Function --> $7
     *
     *  Will open up the modal of information
     *  @parameter none
     *  @return none
     **/

    function loadAll()
    {
        $('#content-modal-2').modal('show');
    }

    /** Function
     *
     *  Will hide the back button
     */
    function hideBackButton()
    {
        $('#back').fadeOut(500);
    }

    /** Function --> $5
     *
     *  Will take the user a step back
     *  @parameter event, callback
     *  @return none
     */
    $five.on('click', function(e)
    {
        choice.decrement();
        if(steps >= 1)
        {
            steps = 1;
        }
        alert("Click any box to reset.");
    });

    /** Function --> $close
     *
     *  Will reload the page, on click
     *  @parameter event, callback
     *  @return none
     */
    $close.on('click', function()
    {
        window.location.reload();
    });

    /** Function
     *
     *  Will prevent the anchor tags from
     *  shifting the viewport
     *  @parameter callback
     *  @return none
     */
    $('a').click(function (e)
    {
        var x = window.pageXOffset,
            y = window.pageYOffset;
        $(window).one('scroll', function ()
        {
            window.scrollTo(x, y);
        })
    });
});