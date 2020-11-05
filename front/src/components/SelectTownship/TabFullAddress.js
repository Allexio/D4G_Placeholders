import React, { useReducer, useCallback } from 'react';

import {
  Button,
  Grid,
  TextField
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  getDepartments,
  getRegions,
  getTownships
} from '../../API/main';

const initialState = {
  departmentList: [],
  regionList: [],
  selectedRegion: '',
  selectedDepartment: '',
  selectedTownship: '',
  townShipList: [],
};

const SET_REGION_LIST = 'SET_REGION_LIST';
const SET_SELECTED_REGION = 'SET_SELECTED_REGION';

const SET_DEPARTMENT_LIST = 'SET_DEPARTMENT_LIST';
const SET_SELECTED_DEPARTMENT = 'SET_SELECTED_DEPARTMENT';

const SET_TOWN_SHIP_LIST = 'SET_TOWN_SHIP_LIST';
const SET_SELECTED_TOWNSHIP = 'SET_SELECTED_TOWNSHIP';

const reducer = (state, action) => {
  switch (action.type) {

    case SET_REGION_LIST:
      return {
        ...state,
        regionList: action.value,
      };

    case SET_SELECTED_REGION:
      return {...state, selectedRegion: action.value};

    case SET_DEPARTMENT_LIST:
      return {
        ...state,
        departmentList: action.value,
      };

    case SET_SELECTED_DEPARTMENT:
      return {...state, selectedDepartment: action.value};

    case SET_TOWN_SHIP_LIST:
      return {
        ...state,
        townShipList: action.value,
      };

    case SET_SELECTED_TOWNSHIP:
      return {...state, selectedTownship: action.value};

    default:
      return state;
  }
}

const TabFullAdress = () => {
  const [
    {
      departmentList,
      regionList,
      selectedRegion,
      selectedDepartment,
      selectedTownship,
      townShipList,
    },
    dispatchState,
  ] = useReducer(reducer, initialState);

  const onSearchRegion = useCallback((e) => {
    const regionPrefix =  e.target.value;

    getRegions(regionPrefix)
      .then((regions) => {
        dispatchState({ type: SET_REGION_LIST, value: regions });
      })
      .catch((e) => {
        console.error('get region', e);
      });
  }, []);

  const onSearchDepartment = useCallback((e) => {
    const departmentPrefix = e.target.value;
      getDepartments(departmentPrefix, selectedRegion)
        .then((departments) => {
          dispatchState({ type: SET_DEPARTMENT_LIST, value: departments });
        })
        .catch((e) => {
          console.error('', e);
        });
  }, [selectedRegion]);

  const onSearchTownship = useCallback((e) => {
    const townshipPrefix = e.target.value;
    getTownships(townshipPrefix, selectedRegion, selectedDepartment)
      .then((townShipList) => {
        dispatchState({ type: SET_TOWN_SHIP_LIST, value: townShipList });
      })
      .catch((e) => {
        console.error('getTownship', e);
      });
  }, [selectedDepartment, selectedRegion]);

  const onClickItemRegion = useCallback((e) => {
    const regionName = e.target.value;
    dispatchState({ type: SET_SELECTED_REGION, value: regionName });
    dispatchState({ type: SET_DEPARTMENT_LIST, value: [] });
    dispatchState({ type: SET_SELECTED_DEPARTMENT, value: '' });
  }, []);

  const onClickItemDepartment = useCallback((e) => {
    const departmentName = e.target.value;
    dispatchState({ type: SET_SELECTED_DEPARTMENT, value: departmentName });
  }, []);

  const onClickItemTownShip = useCallback((e) => {
    const townshipName = e.target.value;
    dispatchState({ type: SET_SELECTED_TOWNSHIP, value: townshipName });
  }, []);

  const toggleSearch = useCallback(() => {

  }, [selectedDepartment, selectedRegion, selectedTownship]);

  return (
    <Grid container item xs={12} style={{ marginTop: 20, justifyContent: 'space-between' }}>
      <Grid item md={3}>
        <Autocomplete
          options={regionList}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Région"
              onChange={onSearchRegion}
              placeholder="Région"
              variant="outlined"
            />
          )}
          onSelect={onClickItemRegion}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </Grid>
      <Grid item md={3}>
        <Autocomplete
          options={departmentList}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Département"
              onChange={onSearchDepartment}
              placeholder="Département"
              variant="outlined"
            />
          )}
          onSelect={onClickItemDepartment}
        />
      </Grid>
      <Grid item md={3}>
        <Autocomplete
          options={townShipList}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Commune"
              onChange={onSearchTownship}
              placeholder="Commune"
              variant="outlined"
            />
          )}
          onSelect={onClickItemTownShip}
        />
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleSearch}
      >
        Recherche
      </Button>
    </Grid>
  );
}

export default TabFullAdress;
