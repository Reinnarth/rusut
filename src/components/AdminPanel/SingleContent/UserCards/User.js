import React from "react";
import {
  Grid,
  Input,
  FormControl,
  InputLabel,
  Typography,
  Select,
} from "@material-ui/core";

export default function User({ newUser, editFlag, classifiers, handleChange }) {
  if (editFlag) {
    return (
      <div>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Фамилия</InputLabel>
            <Input
              value={newUser.surname}
              onChange={handleChange}
              name="surname"
            />
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Имя</InputLabel>
            <Input value={newUser.name} name="name" onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Отчество</InputLabel>
            <Input
              value={newUser.middlename}
              name="middlename"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input value={newUser.email} name="email" onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Роль</InputLabel>
            <Select
              value={newUser.nameRole}
              onChange={handleChange}
              inputProps={{
                name: "nameRole",
              }}
            >
              {classifiers.role.map((el, index) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </div>
    );
  } else {
    return (
      <>
        <Typography>
          {newUser.surname} {newUser.name} {newUser.middlename}
        </Typography>
        <Typography>Роль: {newUser.nameRole}</Typography>
        <Typography>Email: {newUser.email}</Typography>
      </>
    );
  }
}
