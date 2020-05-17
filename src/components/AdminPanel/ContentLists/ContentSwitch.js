import React from "react";
import { useHistory } from "react-router-dom";
import UsersList from "./UsersList";
import BooksList from "./BooksList";
import ActivitiesList from "./ActivitiesList";
import InternshipList from "./InternshipList";
import PracticePlaces from "./PracticePlaces";

export const ContentSwitch = () => {
  let history = useHistory();

  switch (history.location.pathname) {
    case "/admin/users":
      return <UsersList />;
    case "/admin/library":
      return <BooksList />;
    case "/admin/learning-activities":
      return <ActivitiesList />;
    case "/admin/internships":
      return <InternshipList />;
    case "/admin/place_practice":
      return <PracticePlaces />;
    default:
      return <div>Nothing found</div>;
  }
};
