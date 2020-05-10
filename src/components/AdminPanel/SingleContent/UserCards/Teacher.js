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
  const {
    user,
    editFlag,
    classifiers,
    handleChange,
    addSTG,
    updateSTG,
    deleteSTG,
  } = props;

  if (editFlag) {
    return (
      <>
        <Grid item xs={10}>
          <FormControl>
            <InputLabel>Должность</InputLabel>
            <Select
              multiple
              value={
                user.namePositions
                  ? user.namePositions
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
                user.nameScienceDegrees
                  ? user.nameScienceDegrees
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
          {user.namePositions.map((el, index) => (
            <>{` ${el}`}</>
          ))}
        </Typography>

        <Typography>
          Научная степень:
          {user.nameScienceDegrees.map((el, index) => (
            <>{` ${el}`}</>
          ))}
        </Typography>
      </>
    );
  }
}
