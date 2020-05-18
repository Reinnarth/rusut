import React from "react";
import { useSelector } from "react-redux";

import Can from "../Can";
import TeacherViewContainer from "../../containers/PracticeContainer/TeacherViewContainer";
import StudentViewContainer from "../../containers/PracticeContainer/StudentViewContainer";

export default function PracticePage() {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div>
      <Can
        role={user.nameRole}
        perform="practice-page:add"
        yes={(props) => <StudentViewContainer {...props} />}
        no={() => <> </>}
      />
      <Can
        role={user.nameRole}
        perform="practice-page:setMark"
        yes={(props) => <TeacherViewContainer {...props} />}
        no={() => <> </>}
      />
    </div>
  );
}
