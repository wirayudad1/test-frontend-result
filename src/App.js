import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import axios from 'axios';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
function tableV2(data,column){
  const columns = [
    { field: 'name', headerName: 'Name',pinnable:true, width: 130 },
    { field: 'phone', headerName: 'Phone Number', width: 130 },
    {
      field: 'company',
      headerName: 'Company',
      width: 200,
      valueGetter: (params) =>{
        return params.row.company.name
      }
    
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'address',
      headerName: 'City',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.address.city}`,
    },
    {
      field: 'street',
      headerName: 'Street',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.address.street}`,
    },
    {
      field: 'codepos',
      headerName: 'POS Code',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.address.zipcode}`,
    },
  ];
  const columnGroupingModel = [
    {
      groupId: 'naming',
      headerName: 'Living Information',
      freeReordering: true,
      headerAlign: 'center',
      children: [{ field: 'address' }, { field: 'street' },{ field: 'codepos' }],
    },
    {
      groupId: 'personal',
      headerName: 'Personal Information',
      freeReordering: true,
      headerAlign: 'center',
      children: [{ field: 'name' }, { field: 'phone' },{ field: 'company' },{ field: 'email' }],
    },
  ];
  return (
    <div style={{ height: 420, width: '75%',margin:200 }}>
      <DataGrid
        sx={
        { 
            color: '#1875D2',
            backgroundColor: 'aliceblue',
            borderRadius: 2,
            boxShadow:1,
        }
        }  // Sets the margin to 2 times the spacing unit = 16px
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        experimentalFeatures={{ columnGrouping: true }}
        checkboxSelection
        disableColumnMenu
        columnGroupingModel={columnGroupingModel}
        components={{ Toolbar: GridToolbar }}
        initialState={{ pinnedColumns: { left: ['name'], right: ['actions'] } }}
      />
    </div>
  );
}
function table(data){
  let column=['Name','Phone','Username','Company','website']
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              column.length>0 && column.map((name)=>(
                <TableCell align="left">{name}</TableCell>
              ))
            }
          
          </TableRow>
        </TableHead>
        <TableBody>
          { data.length>0 && data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="left">{row.username}</TableCell>
              <TableCell align="left">{row.company.name}</TableCell>
              <TableCell align="left">{row.website}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function BasicTable() {
  const [data,setData]=useState('')

  let data_grid=async()=>axios
  .get('https://my-json-server.typicode.com/glendmaatita/userjsondemo/db')
  .then((response)=> {
    console.log(response)
    let data=response.data.data
    console.log(data)
    setData(data)
    //table(data)
  })
  useEffect(() => {
    data_grid();
  
  }, []);
  console.log(data)
  // return (
  //   <div>
  //     {data.length > 0 && (
  //       <ul>
  //         {data.map(user => (
  //           <li key={user.id}>{user.name}</li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // )
  return tableV2(data)
  
}
