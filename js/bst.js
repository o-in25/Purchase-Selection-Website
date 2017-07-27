/*
 * File: bst.js
 *
 * A pure JavaScript implementation of a binary search tree.
 *
 */

/*
 * Class: BST
 *
 * The binary search tree class.
 *
 */




var BST = function BST()
{
    var Node = function(leftChild, key, value, rightChild, parent)
    {
            return {
                leftChild: (typeof leftChild === "undefined") ? null : leftChild,
                key: (typeof key === "undefined") ? null : key,
                value: (typeof value === "undefined") ? null : value,
                rightChild: (typeof rightChild === "undefined") ? null : rightChild,
                parent: (typeof parent === "undefined") ? null : parent
            };
    },
        root = new Node(),
        searchNode = function(node, key)
        {
            if(node.key === null)
            {
                return null; // key not found
            }

            var nodeKey = parseInt(node.key, 10);

            if(key < nodeKey)
            {
                return searchNode(node.leftChild, key);
            }
            else if(key > nodeKey)
            {
                return searchNode(node.rightChild, key);
            }
            else
            { // key is equal to node key
                return node.value;
            }
        },

        insertNode = function (node, key, value, parent)
        {
            if (node.key === null)
            {
                node.leftChild = new Node();
                node.key = key;
                node.value = value;
                node.rightChild = new Node();
                node.parent = parent;
                return true;
            }

            var nodeKey = parseInt(node.key, 10);

            if (key < nodeKey)
            {
                insertNode(node.leftChild, key, value, node);
            }
            else if (key > nodeKey)
            {
                insertNode(node.rightChild, key, value, node);
            }
            else
            { // key is equal to node key, update the value
                node.value = value;
                return true;
            }
        },

        traverseNode = function (node, callback)
        {
            if (node.key !== null)
            {
                traverseNode(node.leftChild, callback);
                callback(node.key, node.value);
                traverseNode(node.rightChild, callback);
            }

            return true;
        },

        minNode = function(node)
        {
            while (node.leftChild.key !== null)
            {
                node = node.leftChild;
            }

            return node.key;
        },

        maxNode = function (node)
        {
            while (node.rightChild.key !== null)
            {
                node = node.rightChild;
            }

            return node.key;
        },

        successorNode = function (node) {
            var parent;

            if (node.rightChild.key !== null)
            {
                return minNode(node.rightChild);
            }

            parent = node.parent;
            while (parent.key !== null && node == parent.rightChild)
            {
                node = parent;
                parent = parent.parent;
            }

            return parent.key;
        },

        predecessorNode = function (node)
        {
            var parent;

            if (node.leftChild.key !== null)
            {
                return maxNode(node.leftChild);
            }

            parent = node.parent;
            while (parent.key !== null && node == parent.leftChild)
            {
                node = parent;
                parent = parent.parent;
            }

            return parent.key;
        };

    return {

        search: function (key)
        {
            var keyInt = parseInt(key, 10);

            if (isNaN(keyInt))
            {
                return undefined; // key must be a number
            }
            else
            {
                return searchNode(root, keyInt);
            }
        },

        insert: function(key, value)
        {
            var keyInt = parseInt(key, 10);

            if(isNaN(keyInt))
            {
                return undefined; // key must be a number
            }
            else
            {
                return insertNode(root, keyInt, value, null);
            }
        },

        traverse: function(callback)
        {
            if (typeof callback === "undefined")
            {
                callback = function (key, value)
                {
                    print(key + ": " + value);
                };
            }

            return traverseNode(root, callback);
        },


        min: function()
        {
            return minNode(root);
        },


        max: function()
        {
            return maxNode(root);
        },


        successor: function()
        {
            return successorNode(root);
        },


        predecessor: function ()
        {
            return predecessorNode(root);
        }
    };
};

/*
 * Tests
 */

var ipTree = new BST();
ipTree.insert(4, "test4");
ipTree.insert(1, "test1");
ipTree.insert(10, "test10");
ipTree.insert(2, "test2");
ipTree.insert(3, "test3");
ipTree.insert(9, "test9");
ipTree.insert(8, "test8");
ipTree.insert(5, "test5");
ipTree.insert(7, "test7");
ipTree.insert(6, "test6");

ipTree.traverse(function (key, value) {
    print("The value of " + key + " is " + value + ".");
});

print("Searching for 3 results in: " + ipTree.search(3));

print("Min is " + ipTree.min());
print("Max is " + ipTree.max());

print("The successor of root is: " + ipTree.successor());
print("The predecessor of root is: " + ipTree.predecessor());

/*
 * License:
 *
 * Copyright (c) 2011 Trevor Lalish-Menagh (http://www.trevmex.com/)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */