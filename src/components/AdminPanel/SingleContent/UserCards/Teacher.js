import React from "react";
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Select,
} from "@material-ui/core";

export default function Teacher(props) {
  const { newUser, editFlag, classifiers, handleChange } = props;

  if (editFlag) {
    return (
      <>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Должность</InputLabel>
            <Select
              multiple
              value={
                newUser.namePositions
                  ? newUser.namePositions
                  : classifiers.positions[0]
              }
              onChange={handleChange}
              inputProps={{
                name: "namePositions",
                id: "age-native-helper",
              }}
            >
              {classifiers.positions.map((el, index) => {
                return (
                  <option key={index} value={el}>
                    {el}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Научная степень</InputLabel>
            <Select
              multiple
              value={
                newUser.nameScienceDegrees
                  ? newUser.nameScienceDegrees
                  : classifiers.scienceDegrees[0]
              }
              onChange={handleChange}
              inputProps={{
                name: "nameScienceDegrees",
                id: "age-native-helper",
              }}
            >
              {classifiers.scienceDegrees.map((el, index) => {
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
        <Typography>
          Должности:
          {newUser.namePositions.map((el, index) => (
            <>{` ${el}`}</>
          ))}
        </Typography>

        <Typography>
          Научная степень:
          {newUser.nameScienceDegrees.map((el, index) => (
            <>{` ${el}`}</>
          ))}
        </Typography>
      </>
    );
  }
}
