import * as React from 'react';
import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box, IconButton, MenuItem, Select, FormControl, InputLabel, InputAdornment } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import useGetData from '../../../hooks/useGetSimpleData';
import "./style.scss";
import { CardVoyage } from './components/cardVoyage';

export function Cooperative() {
  const { donnes, getData } = useGetData();

  const villeList = [
    "Antananarivo",
    "Antsirabe",
    "Majunga",
    "Toliara",
  ];

  const today = dayjs();
  const [startDate, setStartDate] = React.useState<Dayjs>(today);
  const [depart, setDepart] = React.useState('');
  const [arrive, setArrive] = React.useState('');

  useEffect(() => {
    getData("http://127.0.0.1:3000/voyage/");
  }, []);

  return (
    <div className="all-cooperative-result">
      <div className="search-container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box display="flex" alignItems="center" gap={2} marginTop={2}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="depart-select-label">Départ</InputLabel>
              <Select
                labelId="depart-select-label"
                value={depart}
                onChange={(e) => setDepart(e.target.value)}
                label="Ville de départ"
                startAdornment={
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                }
              >
                {villeList.map((ville, index) => (
                  <MenuItem value={ville} key={index}>{ville}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="arrive-select-label">Arrivée</InputLabel>
              <Select
                labelId="arrive-select-label"
                value={arrive}
                onChange={(e) => setArrive(e.target.value)}
                label="Ville d'arrivée"
                startAdornment={
                  <InputAdornment position="start">
                    <LocationOnIcon />
                  </InputAdornment>
                }
              >
                {villeList.map((ville, index) => (
                  <MenuItem value={ville} key={index}>{ville}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker
              label="Date"
              value={startDate}
              onChange={(newValue) => {
                if (newValue) {
                  setStartDate(newValue);
                }
              }}
              minDate={today}
              sx={{ height: '40px' }}
            />
            <IconButton
              onClick={() => {}}
              sx={{ height: '40px', marginTop: '8px', background: "blue", color: "#ffffff" }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </LocalizationProvider>
      </div>
      <div className="cooperative-list">
        {donnes.map((voyage, index) => {
          const formattedStart = dayjs(voyage.start).format('DD/MM/YYYY');
          const formattedArrived = dayjs(voyage.arrived).format('DD/MM/YYYY');
          
          return (
            <CardVoyage
              key={index}
              adresse={voyage.reservation.cooperative.name}
              nom={voyage.reservation.cooperative.name}
              depart={formattedStart} // Utilisation de la date formatée
              arrive={formattedArrived} // Utilisation de la date formatée
              id={voyage.id}
            />
          );
        })}
      </div>
    </div>
  );
}
