import { searchHistoryAtom } from "@/store"
import { useAtom } from "jotai"
import { useRouter } from "next/router";
import { ListGroup, Button, Card } from "react-bootstrap";
import styles from '../styles/History.module.css';
import { removeFromHistory } from "@/lib/userData";


export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    let parsedHistory = [];
    const router = useRouter()

    if (!searchHistory) return null

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    const historyClicked = (index) => {
        router.push(`/artwork?${searchHistory[index]}`)
    }

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index]))

    }

    return (
        <>
            {parsedHistory.length > 0 &&
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => {
                        return <ListGroup.Item className={styles.historyListItem} key={index} onClick={e => historyClicked(e, index)} >{Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                            <Button className="float-end" variant="danger" size="sm"
                                onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                        </ListGroup.Item>
                    })}
                </ListGroup>
            }

            {parsedHistory.length == 0 &&
                <Card>
                    <Card.Body>
                        <h4>Nothing Here</h4>
                        <p>Try searching for something else</p>
                    </Card.Body>
                </Card>
            }
        </>
    )
}