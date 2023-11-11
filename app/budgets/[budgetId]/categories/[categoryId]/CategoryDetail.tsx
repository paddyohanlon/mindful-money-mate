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
  const category = useAppStore((state) => state.getCategory(budgetId));

  return (
    <>
      <h1>{category.name}</h1>
      <p>{category.group}</p>
      <p>{category.notes}</p>
      <p>
        <FormattedCurrency
          budgetId={budgetId}
          amountCents={category.balanceCents}
        />
      </p>
      <DeleteCategoryButton budgetId={budgetId} categoryId={categoryId}>
        Delete Category
      </DeleteCategoryButton>
    </>
  );
};

export default CategoryDetail;
