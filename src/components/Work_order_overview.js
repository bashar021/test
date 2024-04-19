




import React, { useState } from 'react';

const Table = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);

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

    const handleChildRowExpand = (parentPackage, childIndex) => {
        const childKey = `${parentPackage}-${childIndex}`;
        if (expandedRows.includes(childKey)) {
            setExpandedRows(expandedRows.filter(item => item !== childKey));
        } else {
            setExpandedRows([...expandedRows, childKey]);
        }
    };

    const handleRowSelect = (row) => {
        if (selectedRows.includes(row)) {
        
            setSelectedRows(prevSelectedRows => {
                let updatedSelectedRows = prevSelectedRows.filter(item => {
                    const rowData = data.find(dataItem => dataItem.package === item);
                    return !rowData || (rowData.package !== row && !rowData.children.some(child =>
                        child.name === row || (child.children && child.children.some(grandChild => grandChild.name === row))
                    ));
                });
            
                const rowData = data.find(item => item.package === row);
                if (rowData && rowData.children) {
                    rowData.children.forEach(child => {
                        updatedSelectedRows = updatedSelectedRows.filter(selectedRow => selectedRow !== child.name);
                        if (child.children) {
                            child.children.forEach(grandChild => {
                                updatedSelectedRows = updatedSelectedRows.filter(selectedRow => selectedRow !== grandChild.name);
                            });
                        }
                    });
                }
                return updatedSelectedRows;
            });
        } else {
           
            setSelectedRows(prevSelectedRows => [...prevSelectedRows, row]);

          
            const rowData = data.find(item => item.package === row);
            if (rowData && rowData.children) {
                const allChildren = rowData.children.map(child => child.name);
                setSelectedRows(prevSelectedRows => [...prevSelectedRows, ...allChildren]);
                rowData.children.forEach(child => {
                    if (child.children) {
                        const allGrandChildren = child.children.map(grandChild => grandChild.name);
                        setSelectedRows(prevSelectedRows => [...prevSelectedRows, ...allGrandChildren]);
                    }
                });
            }
        }
    };

    const handleRowExpand = (row) => {
        if (expandedRows.includes(row)) {
            setExpandedRows(expandedRows.filter(item => item !== row));
        } else {
            setExpandedRows([...expandedRows, row]);
        }
    };

    const handleSelectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(data.map(item => item.package));
        }
    };

    const toggleButton = (event) => {
        const button = event.target;
        button.innerHTML = button.innerHTML === '+' ? '-' : '+';
    };
    const toggleArrow  = (event) => {
        const button = event.target;
        button.innerHTML = button.innerHTML === '▼' ? '▲' : '▼';
    };
    return (
        <table>
            <thead id='overview_column_head'>
                <tr>
                    {/* <th>
                        <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selectedRows.length === data.length && data.length !== 0}
                        />
                    </th> */}
                    <th>.</th>
                    <th>Package</th>
                    <th>Rate (per sqft)</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {data.map((row, index) => (
                    <React.Fragment key={index}>
                        <tr className='parent_row' onClick={() => handleRowExpand(row.package)}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row.package)}
                                    onChange={() => handleRowSelect(row.package)}
                                />
                            </td>
                            <td>{row.package}</td>
                            <td>{row.rate}</td>
                            <td>{row.total}</td>
                            {/* <td><button>+</button></td> */}
                            <td><button key={index} onClick={toggleButton}>
                                +
                            </button></td>
                        </tr>
                        {expandedRows.includes(row.package) && row.children.map((child, childIndex) => (
                            <React.Fragment key={`${index}-${childIndex}`}>
                                <tr className='child_row' onClick={() => handleChildRowExpand(row.package, childIndex)}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(child.name)}
                                            onChange={() => handleRowSelect(child.name)}
                                        />
                                    </td>
                                   
                                    <td>{child.name}</td>
                                    <td>{child.rate}</td>
                                    <td>{child.total}</td>
                                    <td><button  key={index} onClick={toggleArrow}>▼</button></td>
                                </tr>
                                {expandedRows.includes(`${row.package}-${childIndex}`) && 
                                  
                                    child.children.map((grandChild, grandChildIndex) => (
                                        <tr className='grandchild_row ' key={`${index}-${childIndex}-${grandChildIndex}`}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(grandChild.name)}
                                                    onChange={() => handleRowSelect(grandChild.name)}
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
    );
};

export default Table;



