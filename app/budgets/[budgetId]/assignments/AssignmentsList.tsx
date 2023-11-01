import FormattedDate from "@/app/components/FormattedDate";
import useAppStore from "@/app/store";
import dynamic from "next/dynamic";

const FormattedCurrency = dynamic(
  () => import("@/app/budgets/[budgetId]/FormattedCurrency"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
}

const AssignmentsList = ({ budgetId }: Props) => {
  const getAssignmentsForBudget = useAppStore((state) =>
    state.assignments.filter((a) => a.budgetId === budgetId)
  );
  const { getCategory } = useAppStore();

  return (
    <>
      {getAssignmentsForBudget.length === 0 ? (
        <div className="prose">
          <p>No assignments yet.</p>
          <p>
            An assignment is automatically created when a category balance is
            set or updated.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {getAssignmentsForBudget.map((assignment) => (
                <tr key={assignment.id}>
                  <td>
                    <FormattedDate timestamp={assignment.date} />
                  </td>
                  <td>{getCategory(assignment.categoryId).name}</td>
                  <td>
                    <FormattedCurrency
                      budgetId={budgetId}
                      amount={assignment.amount}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AssignmentsList;
