import React from "react";
import { useSelector } from "react-redux";

import Can from "../Can";
import ExamContainer from "../../containers/ExamContainer/ExamContainer";
import StudentExamContainer from "../../containers/ExamContainer/StudentExamContainer";

export default function SemesterPage() {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div>
      <Can
        role={user.nameRole}
        perform="semester-page:setExam"
        yes={(props) => <ExamContainer {...props} />}
        no={() => <StudentExamContainer />}
      />
    </div>
  );
}
