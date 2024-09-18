import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
    Header,
    Table,
    Button,
} from "../../components";
import { formatDate } from "../../helpers/formaters"; 
import { RESULTS_HEADERS } from "../../config/results";
import { ResultItem } from "../../types/results.types";
import { ROUTER_PATHS } from "../../config/router";
import styles from "./resultsPage.module.scss";

const ResultsPage: FC = () => {
    const navigate = useNavigate();
    const results = JSON.parse(localStorage.getItem('best_results') || '[]');
    const tableData = results?.map((result: ResultItem) => ({
        ...result,
        date: formatDate(result.date),
    }));

    return (
        <div className={styles.root}>
            <Header />
            <h1 className={styles.root__title}>Best results</h1>
            <div className={styles.root__table}>
                <Table headers={RESULTS_HEADERS} data={tableData} />
            </div>
            {tableData.length <= 0 ? (
                <div className={styles.root__noData}>
                    <Button
                        onClick={() => {
                            navigate(ROUTER_PATHS.HOME);
                        }}
                    >
                        Start new game
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

export default ResultsPage;