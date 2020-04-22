import React from 'react'
import { TextField, Button } from '@material-ui/core';
import { css } from 'emotion';

const SearchCity = ({ cityName, onValueChange, search }) => {
  return (
    <div className={css`
      text-align: center;
      margin-top: 5%;
    `}>
      <TextField 
        id="standard-basic" 
        label="Search for city"
        value={cityName}
        onChange={onValueChange}
      />
      <Button 
        className={css`
          margin-top: 10px;
          margin-left: 20px;
        `}
        variant="contained" 
        color="primary"
        onClick={search}
        disabled={ cityName.length > 2 ? false : true }
      >
        Search
      </Button>
    </div>
  )
};

export default SearchCity;