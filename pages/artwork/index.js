/*********************************************************************************
*  WEB422 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Angelo Ivan Mejia Student ID: 115777211 Date: 11/07/23
*  GitHub Repo: https://github.com/CoyAri/web422-a5
*  Netlify Link: https://helpful-beijinho-20cd88.netlify.app/
*
********************************************************************************/ 



import { useRouter } from "next/router"
import Error from "next/error";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import useSWR from "swr";
import validObjectIDList from '@/public/data/validObjectIDList.json'

const PER_PAGE = 12

export default function ArtWork() {
    const router = useRouter();
    let finalQuery = router.asPath.split("?")[1]
    let [artworkList, setArtworkList] = useState(null)
    let [page, setPage] = useState(1)

    const previousPage = () => {
        page > 1 && setPage(page - 1)
    }

    const nextPage = () => {
        page < artworkList.length && setPage(page + 1)
    }

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

    useEffect(() => {
        console.log("Data: " + data)
        if (data) {
            let results = []
            let filteredResults = validObjectIDList.objectIDs.filter((objectID) =>
                data.objectIDs?.includes(objectID)
            );
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                const chunk = filteredResults.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results)
            console.log(artworkList)
            setPage(1)
        }
    }, [data])

    if (error) {
        return <Error statusCode={404} />
    }
    else if (!artworkList) {
        return null
    }

    return (
        <>
            <Container>
                <Row className="gy-4">
                    {artworkList.length > 0 && artworkList[page - 1].map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))}
                    {artworkList.length == 0 &&
                        <Card>
                            <Card.Body>
                                <h4>Nothing Here</h4>
                                <p>Try searching for something else</p>
                            </Card.Body>
                        </Card>
                    }
                </Row>
                <br />
                {artworkList.length > 0 &&
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Pagination>
                                <Pagination.Prev onClick={previousPage} />
                                <Pagination.Item>{page}</Pagination.Item>
                                <Pagination.Next onClick={nextPage} />
                            </Pagination>
                        </Col>
                    </Row>
                }
            </Container>
        </>
    )
}