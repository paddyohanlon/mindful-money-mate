import useAppStore from "@/app/store";
import dynamic from "next/dynamic";

const DeleteCategoryButton = dynamic(() => import("./DeleteCategoryButton"), {
  ssr: false,
});
const FormattedCurrency = dynamic(
  () => import("@/app/budgets/[budgetId]/FormattedCurrency"),
  {
    ssr: false,
  }
);

interface Props {
  budgetId: string;
  categoryId: string;
}

const CategoryDetail = ({ budgetId, categoryId }: Props) => {
  const { getCategory } = useAppStore();

  return (
    <>
      <h1>{getCategory(categoryId).name}</h1>
      <p>{getCategory(categoryId).group}</p>
      <p>{getCategory(categoryId).notes}</p>
      <p>
        <FormattedCurrency
          budgetId={budgetId}
          amountCents={getCategory(categoryId).balanceCents}
        />
      </p>
      <DeleteCategoryButton budgetId={budgetId} categoryId={categoryId}>
        Delete Category
      </DeleteCategoryButton>
    </>
  );
};

export default CategoryDetail;
