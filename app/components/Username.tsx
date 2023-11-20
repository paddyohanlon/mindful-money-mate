import { useEffect, useState } from "react";
import { rid } from "../services/rethinkid";

interface Props {
  userId: string;
}

const Username = ({ userId }: Props) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    rid.social.getUser(userId).then((user) => setUsername(user.name));
  }, [userId]);

  return <>{username}</>;
};

export default Username;
