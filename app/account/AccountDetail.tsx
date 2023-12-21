import useAppStore from "../store";

const AccountDetail = () => {
  const user = useAppStore((state) => state.user);

  return (
    <div className="prose pb-8">
      <h1>Account</h1>
      <ul>
        <li>
          <span>User ID: {user.id}</span>
        </li>
        <li>
          <span>Name: {user.name}</span>
        </li>
        <li>
          <span>Email: {user.email}</span>
        </li>
      </ul>
    </div>
  );
};

export default AccountDetail;
