import { useFormStatus } from "react-dom";
import Input from "../ui/Input";

const ReviewActions = ({ handleReset }) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex gap-2 mt-2">
      {/* formAction 연동시에는 form내부 submit, reset을 button이 아닌 input으로 처리 */}
      <Input type="submit" disabled={pending} className="-hue-rotate-10" value={pending ? "POSTING..." : "POST"} />

      <Input onClick={handleReset} type="reset" className="-hue-rotate-40" value="CANCEL" />
    </div>
  );
};

export default ReviewActions;
