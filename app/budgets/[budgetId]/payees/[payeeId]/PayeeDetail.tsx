import useAppStore from "@/app/store";
import dynamic from "next/dynamic";

interface Props {
  budgetId: string;
  payeeId: string;
}

const DeletePayeeButton = dynamic(() => import("./DeletePayeeButton"), {
  ssr: false,
});

const PayeeDetail = ({ budgetId, payeeId }: Props) => {
  const { getPayee } = useAppStore();

  return (
    <>
      <h1>{getPayee(payeeId).name}</h1>
      <DeletePayeeButton budgetId={budgetId} payeeId={payeeId}>
        Delete Payee
      </DeletePayeeButton>
    </>
  );
};

export default PayeeDetail;
