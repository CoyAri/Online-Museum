import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

    if (!favouritesList) return null;
    return (
        <>
            <Row className="gy-4">
                {favouritesList.length > 0 && favouritesList.map((currentObjectID) => (
                    <Col lg={3} key={currentObjectID}>
                        <ArtworkCard objectID={currentObjectID} />
                    </Col>
                ))}
                {favouritesList.length == 0 &&
                    <Card>
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            <p>Try searching for something else</p>
                        </Card.Body>
                    </Card>
                }
            </Row>
        </>
    )
}