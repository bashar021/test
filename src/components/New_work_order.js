import React, { useState, useEffect } from 'react'

export default function New_work_order() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const [parent, setParent] = useState([]);
    const [child, setChild] = useState([]);
    const [grandChild, setGrandChild] = useState([]);
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
    


    const handleChildRowExpand = (parentPackage, childIndex) => {
        const childKey = `${parentPackage}-${childIndex}`;
        if (expandedRows.includes(childKey)) {
            setExpandedRows(expandedRows.filter(item => item !== childKey));
        } else {
            setExpandedRows([...expandedRows, childKey]);
        }
    };
    const handleRowExpand = (row) => {
        if (expandedRows.includes(row)) {
            setExpandedRows(expandedRows.filter(item => item !== row));
        } else {
            setExpandedRows([...expandedRows, row]);
        }
    };



    const toggleButton = (event) => {
        const button = event.target;
        button.innerHTML = button.innerHTML === '+' ? '-' : '+';
    };
    const toggleArrow = (event) => {
        const button = event.target;
        button.innerHTML = button.innerHTML === '▼' ? '▲' : '▼';
    };

    const seleAllRows = function () {

    }


    return (
        <table>
            <thead id='overview_column_head'>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            onChange={() => {
                                const updatedParentsArray = [...parentsArray];
                                updatedParentsArray.forEach(parent => {
                                    parent.isChecked = !parent.isChecked; 
                                    parent.children.forEach(child => {
                                        child.isChecked = !child.isChecked; 
                                        child.children.forEach(grandchild => {
                                            grandchild.isChecked = !grandchild.isChecked; 
                                        });
                                    });
                                });
                                setParentsArray(updatedParentsArray)
                            }}
                            checked={parentsArray.every(parent => parent.isChecked)}
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
                                <input
                                    type="checkbox"
                                    checked={parentsArray.length > 0 ? parentsArray[index].isChecked : false}
                                    onChange={() => {
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

                                    }}
                                />
                            </td>
                            <td>{row.package}</td>
                            <td>{row.rate}</td>
                            <td>{row.total}</td>
                            {/* <td><button>+</button></td> */}
                            <td><button className='colapsed_btn' key={index} onClick={(event) => {handleRowExpand(row.package);toggleButton(event)}}>
                                +
                            </button></td>

                        </tr>
                        {expandedRows.includes(row.package) && row.children.map((child, childIndex) => (
                            <React.Fragment key={`${index}-${childIndex}`}>
                                <tr className='child_row' >
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={parentsArray[index].children[childIndex].isChecked}
                                            onChange={() => {
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

                                            }}
                                        />
                                    </td>

                                    <td>{child.name}</td>
                                    <td>{child.rate}</td>
                                    <td>{child.total}</td>
                                    <td><button key={index} onClick={(event) => {handleChildRowExpand(row.package, childIndex);toggleArrow(event)}}>▼</button></td>
                                </tr>
                                {expandedRows.includes(`${row.package}-${childIndex}`) &&

                                    child.children.map((grandChild, grandChildIndex) => (

                                        <tr className='grandchild_row ' key={`${index}-${childIndex}-${grandChildIndex}`}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={parentsArray[index].children[childIndex].children[grandChildIndex].isChecked}
                                                    onChange={() => {
                                                        const updatedParentData = [...parentsArray];
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


                                                    }}
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
