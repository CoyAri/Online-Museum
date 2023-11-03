import React from 'react'
import useSWR from "swr"
import Error from "next/error"
import { Card, Button } from "react-bootstrap"
import Link from "next/link"

export default function ArtworkCardDetail({objectID}) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if (error) {
        return <Error statusCode={404} />
    }
    else if (!data) {
        console.log("The SWR request didn't return anything.")
        return null
    }
    else {
        return (
            <>
                <Card style={{ width: '18rem' }}>
                    {data.primaryImageSmall ?
                        <Card.Img variant="top" src={data.primaryImageSmall} /> :
                        <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]" />}
                    <Card.Body>
                        <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                        <Card.Text>
                            Date : {data.objectDate ? data.objectDate : "N/A"} <br />
                            Classification : {data.classification ? data.classification : "N/A"} <br />
                            Medium : {data.medium ? data.medium : "N/A"} <br />
                            Artist Name : {data.artistDisplayName ? data.artistDisplayName : "N/A"} <br />
                            Credit : {data.creditLine ? data.creditLine : "N/A"} <br />
                            Dimensions : {data.dimensions ? data.dimensions : "N/A"} <br />
                        </Card.Text>
                        <Link href={`/artwork/${objectID}`}><Button variant="primary">{objectID}</Button></Link>
                    </Card.Body>

                </Card>
            </>
        )
    }
}