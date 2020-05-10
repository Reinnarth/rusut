import React from "react";
import {
  Grid,
  Input,
  FormControl,
  InputLabel,
  Typography,
  Select,
} from "@material-ui/core";

export default function User({ user, editFlag, classifiers, handleChange }) {
  if (editFlag) {
    return (
      <div>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Фамилия</InputLabel>
            <Input
              value={user.surname}
              onChange={handleChange}
              name="surname"
            />
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Имя</InputLabel>
            <Input value={user.name} name="name" onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Отчество</InputLabel>
            <Input
              value={user.middlename}
              name="middlename"
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Логин</InputLabel>
            <Input value={user.login} name="login" onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input value={user.email} name="email" onChange={handleChange} />
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Роль</InputLabel>
            <Select
              value={user.nameRole}
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
          {user.surname} {user.name} {user.middlename}
        </Typography>
        <Typography>Логин: {user.login}</Typography>
        <Typography>Роль: {user.nameRole}</Typography>
        <Typography>Email: {user.email}</Typography>
      </>
    );
  }
}
