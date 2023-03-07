import { Box, Typography } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import React from "react";
import './pages/table.css'
type Props = {
    title: string;
    field: string;
    objects: any[];
}
const columns: GridColumns = [
    {
        field: "minValue", headerName: "Minimal Value", headerAlign: "center",
        align: "center", headerClassName: "header", flex: 1
    },
    {
        field: "maxValue", headerName: "Maximal Value", headerAlign: "center",
        align: "center", headerClassName: "header", flex: 1
    },
    {
        field: "avgValue", headerName: "Average Value", headerAlign: "center",
        align: "center", headerClassName: "header", flex: 1
    }
]
export const Statistics: React.FC<Props> = ({ title, field, objects }) => {
    let statistics: any = {id: 1}
    if (objects.length > 0) {
        const initialObject: { minValue: number, maxValue: number, avgValue: number } =
        {
            minValue: objects[0][field],
            maxValue: objects[0][field],
            avgValue: 0
        };
        statistics = objects.reduce((res, cur) => {
            if (res.minValue > cur[field]) {
                res.minValue = cur[field];
            } else if(res.maxValue < cur[field]) {
                res.maxValue = cur[field];
            }
            res.avgValue += cur[field]
             return res;  
        }, initialObject)
        statistics.id = 1;
        statistics.avgValue = Math.round(statistics.avgValue / objects.length);
    }


    return <Box sx={{ width: {xs:"95vw", sm:"70vw",md:"60vw"},
     height: {xs: "50vh", md: "40vh"} }}>
        <Typography sx={{fontSize: "1.8em",
         fontWeight: "bold", textAlign: "center"}}>{title}</Typography>
        <DataGrid columns={columns} rows={[statistics]} />
    </Box>
}