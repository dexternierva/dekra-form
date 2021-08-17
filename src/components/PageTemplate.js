import * as React from "react";
import moment from "moment";

const PageTemplate = (props) => {
    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "36px",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                    width: "60%"
                }}
            >
                <div style={{  color: "#008B4F", fontSize: "1.25em", fontWeight: "700" }}>DEKRA Expert Migration</div>
                <div style={{ color: "#008B4F", fontSize: "1.25em", fontWeight: "400" }}>Curriculum Vitae</div>
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "36px",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "60%"
                }}
            >
                <div>Seite {props.pageNum} von {props.totalPages}</div>
                <div>{moment().format("DD.MM.YYYY")}</div>
            </div>
        </>
    );
};

export default PageTemplate;