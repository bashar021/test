import React, { useState, useEffect } from 'react'

export default function New_work_order() {
    // const [selectedRows, setSelectedRows] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    // const [parent, setParent] = useState([]);
    // const [child, setChild] = useState([]);
    // const [grandChild, setGrandChild] = useState([]);
    const [parentsArray, setParentsArray] = useState([]);
    const data = [
        {
            package: 'Package 1',
            rate: 10,
            total: 100,
            children: [
                {
                    name: 'Child 1',
                    rate: 5,
                    total: 50,
                    children: [
                        { name: 'Grandchild 1', rate: 2, total: 20 },
                        { name: 'Grandchild 2', rate: 3, total: 30 }
                    ]
                },
                {
                    name: 'Child 2',
                    rate: 7,
                    total: 70,
                    children: [
                        { name: 'Grandchild 3', rate: 4, total: 40 },
                        { name: 'Grandchild 4', rate: 3, total: 30 }
                    ]
                }
            ]
        },
        {

            package: 'Package 2',
            rate: 15,
            total: 150,
            children: [
                {
                    name: 'Child 3',
                    rate: 8,
                    total: 80,
                    children: [
                        { name: 'Grandchild 5', rate: 5, total: 50 },
                        { name: 'Grandchild 6', rate: 3, total: 30 }
                    ]
                },
                {
                    name: 'Child 4',
                    rate: 6,
                    total: 60,
                    children: [
                        { name: 'Grandchild 7', rate: 4, total: 40 },
                        { name: 'Grandchild 8', rate: 2, total: 20 }
                    ]
                }
            ]
        }
    ];
   /**
    * The `createHierarchy` function recursively creates a hierarchical structure from the input data
    * with an additional `isChecked` property set to `false` for each node.
    * @param data - The `data` parameter in the `createHierarchy` function is an array of objects
    * representing a hierarchical structure. Each object in the array can have a `children` property
    * which is also an array of objects representing the children of that parent object in the
    * hierarchy. The function recursively creates a hierarchy by mapping
    * @returns The `createHierarchy` function is returning a new array where each element is an object
    * that includes the original data from the input array `data`, along with an additional property
    * `isChecked` set to `false`, and a `children` property that is recursively populated by calling
    * `createHierarchy` on the `children` property of each element in the input `data` array.
    */
    const createHierarchy = (data) => {
        return data.map(parent => {
            const children = parent.children ? createHierarchy(parent.children) : [];
            return { ...parent, isChecked: false, children };
        });
    };
    useEffect(() => {

        setParentsArray(createHierarchy(data));
        // console.log(parentsArray)

    }, []);



    /**
     * The function `handleChildRowExpand` toggles the expansion state of a child row within a parent
     * package.
     * @param parentPackage - The `parentPackage` parameter is a string that represents the parent
     * package or group to which the child row belongs.
     * @param childIndex - The `childIndex` parameter represents the index of the child row that is
     * being expanded or collapsed within a parent package.
     */
    const handleChildRowExpand = (parentPackage, childIndex) => {
        const childKey = `${parentPackage}-${childIndex}`;
        if (expandedRows.includes(childKey)) {
            setExpandedRows(expandedRows.filter(item => item !== childKey));
        } else {
            setExpandedRows([...expandedRows, childKey]);
        }
    };
    /**
     * The function `handleRowExpand` toggles the expansion state of a row in a list based on whether
     * it is already expanded or not.
     * @param row - The `row` parameter in the `handleRowExpand` function likely represents a specific
     * row that the user wants to expand or collapse. This function toggles the expansion state of the
     * row by adding it to the `expandedRows` state if it's not already expanded, or removing it from
     * the `
     */
    const handleRowExpand = (row) => {
        if (expandedRows.includes(row)) {
            setExpandedRows(expandedRows.filter(item => item !== row));
        } else {
            setExpandedRows([...expandedRows, row]);
        }
    };



   /**
    * The `toggleButton` function toggles the inner HTML content of a button between '+' and '-'.
    * @param event - The `event` parameter in the `toggleButton` function is an event object that
    * represents an event being handled, such as a click event on a button. It contains information
    * about the event, such as the target element that triggered the event.
    */
    const toggleButton = (event) => {
        const button = event.target;
        button.innerHTML = button.innerHTML === '+' ? '-' : '+';
    };
   /**
    * The `toggleArrow` function toggles between displaying '▼' and '▲' when called.
    * @param event - The `event` parameter in the `toggleArrow` function represents the event that
    * occurred, such as a click event, that triggered the function to be called. It contains
    * information about the event, such as the target element that was clicked.
    */
    const toggleArrow = (event) => {
        const button = event.target;
        button.innerHTML = button.innerHTML === '▼' ? '▲' : '▼';
    };

   /**
    * The function `handleParent` toggles the `isChecked` property of a parent object and its children
    * and grandchildren in an array.
    * @param index - The `index` parameter in the `handleParent` function represents the index of the
    * parent element in the `parentsArray` that needs to be updated.
    */
   const handleParent = function(index){
     // console.log(parentsArray)
     const updatedParentsArray = [...parentsArray];
     const parent = updatedParentsArray[index];
     parent.isChecked = !parent.isChecked;
     parent.children.forEach(child => {
         child.isChecked = parent.isChecked;
         child.children.forEach(grandchild => {
             grandchild.isChecked = parent.isChecked;
         });
     });
     setParentsArray(updatedParentsArray)

    
   }
    /**
     * The function `handleChild` toggles the `isChecked` property of a child element and updates the
     * parent element accordingly.
     * @param index - The `index` parameter represents the index of the parent element in the
     * `parentsArray` that you want to handle.
     * @param childIndex - The `childIndex` parameter represents the index of the child within the
     * children array of a parent in the `parentsArray`.
     */
    const handleChild = function(index,childIndex){
        const updatedParentsArray = [...parentsArray];
        const child = updatedParentsArray[index].children[childIndex];
        child.isChecked = !child.isChecked;
        child.children.forEach(grandchild => {
            grandchild.isChecked = child.isChecked;
        });
        const parent = updatedParentsArray[index];
        parent.isChecked = parent.children.every(child => child.isChecked);
        setParentsArray(updatedParentsArray)
        // console.log(parentsArray[index].isChecked)

    }
    /**
     * The function `handleGrandChild` updates the state of checkboxes for grandchildren, children, and
     * parents in a nested data structure.
     * @param index - The `index` parameter in the `handleGrandChild` function refers to the index of
     * the parent element in the `parentsArray` that contains the child and grandchild elements you
     * want to update.
     * @param childIndex - The `childIndex` parameter in the `handleGrandChild` function refers to the
     * index of the child within the children array of a parent. It is used to access and update a
     * specific child within the parent's children array.
     * @param grandChildIndex - The `grandChildIndex` parameter in the `handleGrandChild` function
     * represents the index of the grandchild within the children array of a specific child. It is used
     * to identify and update a specific grandchild within the nested data structure.
     */
    const handleGrandChild = function(index,childIndex,grandChildIndex){
        const updatedParentsArray = [...parentsArray];

        const updatedChild = { ...updatedParentsArray[index].children[childIndex].children[grandChildIndex] };
        updatedChild.isChecked = !updatedChild.isChecked;
        updatedParentsArray[index].children[childIndex].children[grandChildIndex] = updatedChild;

        const parent = updatedParentsArray[index];
        parent.isChecked = parent.children.every(child => child.isChecked);


        const allGrandchildrenChecked = updatedParentsArray[index].children[childIndex].children.every(child => child.isChecked);
        updatedParentsArray[index].children[childIndex].isChecked = allGrandchildrenChecked;

        const allChildrenChecked = parent.children.every(child => child.isChecked);
        parent.isChecked = allChildrenChecked;

        setParentsArray(updatedParentsArray);

    }
    return (
        <table>
            <thead id='overview_column_head'>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={parentsArray.every(parent => parent.isChecked)}
                            /* The above code is a JavaScript event handler function that is triggered
                            when a change event occurs. It updates the state of a nested array
                            structure (parentsArray) based on the checked status of a target element
                            in the event. */
                            onChange={(event) => {
                                const updatedParentsArray = [...parentsArray];
                                updatedParentsArray.forEach(parent => {
                                    parent.isChecked = event.target.checked; 
                                    parent.children.forEach(child => {
                                        child.isChecked = event.target.checked;  
                                        child.children.forEach(grandchild => {
                                            grandchild.isChecked = event.target.checked; 
                                        });
                                    });
                                });
                                // console.log(this)
                                setParentsArray(updatedParentsArray)
                            }}
                            
                        />
                    </th>
                    {/* <th>.</th> */}
                    <th>Package</th>
                    <th>Rate (per sqft)</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {data.map((row, index) => (
                    <React.Fragment key={index}  >
                        <tr className='parent_row' >
                            <td>
                               /* The above code is creating a checkbox input element in JavaScript.
                               The `checked` attribute of the checkbox is set based on a condition -
                               if the length of the `parentsArray` is greater than 0, then the
                               checkbox will be checked if the `isChecked` property of the
                               `parentsArray` element at the specified index is true, otherwise it
                               will be unchecked. The `onChange` event handler is set to call the
                               `handleParent` function passing the index as an argument when the
                               checkbox is clicked. */
                                <input
                                    type="checkbox"
                                    checked={parentsArray.length > 0 ? parentsArray[index].isChecked : false}
                                    onChange={() => {handleParent(index)}}
                                />
                            </td>
                            <td>{row.package}</td>
                            <td>{row.rate}</td>
                            <td>{row.total}</td>
                            {/* <td><button>+</button></td> */}
                            <td><button className='colapsed_btn' key={index} onClick={(event) => { handleRowExpand(row.package); toggleButton(event) }}>
                                +
                            </button></td>

                        </tr>
                        {expandedRows.includes(row.package) && row.children.map((child, childIndex) => (
                            <React.Fragment key={`${index}-${childIndex}`}>
                                <tr className='child_row' >
                                    <td>
                                       /* The above code is a JSX snippet in a React component. It is
                                       rendering a checkbox input element with the following
                                       attributes:
                                       - type: checkbox
                                       - checked: The value is determined by the isChecked property
                                       of an item in the parentsArray at index 'index' and its child
                                       at index 'childIndex'.
                                       - onChange: It calls the handleChild function with the
                                       parameters index and childIndex when the checkbox is changed. */
                                        <input
                                            type="checkbox"
                                            checked={parentsArray[index].children[childIndex].isChecked}
                                            onChange={() => {handleChild(index,childIndex)}}
                                        />
                                    </td>

                                    <td>{child.name}</td>
                                    <td>{child.rate}</td>
                                    <td>{child.total}</td>
                                    <td><button key={index} onClick={(event) => { handleChildRowExpand(row.package, childIndex); toggleArrow(event) }}>▼</button></td>
                                </tr>
                                {expandedRows.includes(`${row.package}-${childIndex}`) &&

                                    child.children.map((grandChild, grandChildIndex) => (

                                        <tr className='grandchild_row ' key={`${index}-${childIndex}-${grandChildIndex}`}>
                                            <td>
                                                /* The above code is creating a checkbox input element
                                                in HTML with the following attributes:
                                                - type: checkbox
                                                - checked: The value is determined by the isChecked
                                                property of an object located at specific indexes
                                                within the parentsArray array.
                                                - onChange: This event handler function is triggered
                                                when the checkbox is clicked, and it calls the
                                                handleGrandChild function with the specified indexes
                                                (index, childIndex, grandChildIndex) as arguments. */
                                                <input
                                                    type="checkbox"
                                                    checked={parentsArray[index].children[childIndex].children[grandChildIndex].isChecked}
                                                    onChange={() => {handleGrandChild(index,childIndex,grandChildIndex)}}
                                                />
                                            </td>

                                            <td>{grandChild.name}</td>
                                            <td>{grandChild.rate}</td>
                                            <td>{grandChild.total}</td>
                                        </tr>
                                    ))
                                }
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}
