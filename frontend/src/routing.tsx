import { Navigate } from 'react-router-dom';
import { IQuestions } from './redux/quizSlice'

export type ProtectedRouteProps = {
  quizQuestions: IQuestions;
  homePath: string;
  outlet: JSX.Element;
};

export function ProtectedRoute({ quizQuestions, homePath, outlet }: ProtectedRouteProps) {

  function isEmpty(obj: any): boolean {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }


  if (isEmpty(quizQuestions)) {
    return <Navigate to={{ pathname: homePath }} />;
  } else {
    return outlet;

  }
};


