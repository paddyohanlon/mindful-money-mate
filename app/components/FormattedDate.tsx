interface Props {
  timestamp: number;
}
const FormattedDate = ({ timestamp }: Props) => {
  return <>{new Date(timestamp).toDateString()}</>;
};

export default FormattedDate;
