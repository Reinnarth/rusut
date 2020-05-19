import React from "react";
import {
  Grid,
  Input,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
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
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => selected.join(", ")}
              inputProps={{
                name: "namePositions",
                id: "age-native-helper",
              }}
            >
              {classifiers.positions.map((el, index) => {
                return (
                  <MenuItem key={index} value={el}>
                    <Checkbox
                      checked={newUser.namePositions.indexOf(el) > -1}
                    />
                    <ListItemText primary={el} />
                  </MenuItem>
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
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => selected.join(", ")}
              onChange={handleChange}
              inputProps={{
                name: "nameScienceDegrees",
                id: "age-native-helper",
              }}
            >
              {classifiers.scienceDegrees.map((el, index) => (
                <MenuItem key={index} value={el}>
                  <Checkbox
                    checked={newUser.nameScienceDegrees.indexOf(el) > -1}
                  />
                  <ListItemText primary={el} />
                </MenuItem>
              ))}
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
