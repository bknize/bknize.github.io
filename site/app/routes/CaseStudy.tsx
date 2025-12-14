import { useParams } from "react-router";

const CaseStudy = () => {
  let params = useParams();

    return <div>Workd { params.caseId }</div>
}

export default CaseStudy