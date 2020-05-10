import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Typography,
  Select,
} from "@material-ui/core";

export default function Student({ user, editFlag, classifiers, handleChange }) {
  if (editFlag) {
    return (
      <>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Специальность</InputLabel>
            <Select
              value={
                user.nameSpecialty
                  ? user.nameSpecialty
                  : classifiers.specialty[0]
              }
              onChange={handleChange}
              inputProps={{
                name: "nameSpecialty",
                id: "age-native-helper",
              }}
            >
              {classifiers.specialty.map((el, index) => {
                return (
                  <option key={index} value={el.nameSpecialty}>
                    {el.nameSpecialty}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Группа</InputLabel>
            <Select
              value={
                user.numberGroup
                  ? user.numberGroup
                  : classifiers.specialty.find(
                      (el) => el.nameSpecialty === user.nameSpecialty
                    ).numberGroup[0]
              }
              onChange={handleChange}
              inputProps={{
                name: "numberGroup",
                id: "age-native-helper",
              }}
            >
              {classifiers.specialty
                .find((el) => el.nameSpecialty === user.nameSpecialty)
                .numberGroup.map((el, index) => {
                  return (
                    <option key={index} value={el}>
                      {el}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Typography>Специальность: {user.nameSpecialty}</Typography>
        <Typography>Группа {user.numberGroup}</Typography>
        <Typography>Номер зачетной книжки: {user.numberBook}</Typography>
      </>
    );
  }
}
