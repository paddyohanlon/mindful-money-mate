import { useEffect, useState } from "react";
import { bzr } from "../services/bzr";

interface Props {
  userId: string;
}

const Username = ({ userId }: Props) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    bzr.social.getUser({ userId }).then((user) => setUsername(user.name));
  }, [userId]);

  return <>{username}</>;
};

export default Username;
