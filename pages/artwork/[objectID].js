import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";


export default function ArtWorkByID() {
    const router = useRouter();
    const { objectID } = router.query;

    if(!objectID) {
        return null
    }
    return(
        <Row>
            <Col className="d-flex justify-content-center">
                <ArtworkCardDetail objectID={objectID} />
            </Col>
        </Row>
    )
}