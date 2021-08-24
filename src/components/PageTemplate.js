import * as React from "react";
import moment from "moment";

const PageTemplate = (props) => {
    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "56px",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                    width: "90%"
                }}
            >
                <div style={{  color: "#008B4F", fontSize: "0.875em", fontWeight: "700" }}>DEKRA Expert Migration</div>
                <div style={{ color: "#008B4F", fontSize: "0.875em", fontWeight: "400" }}>Curriculum Vitae</div>
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "56px",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%"
                }}
            >
                <div style={{  color: "#666666", fontSize: "0.875em" }}>Seite {props.pageNum} von {props.totalPages}</div>
                <div style={{  color: "#666666", fontSize: "0.875em" }}>{moment().format("DD.MM.YYYY")}</div>
            </div>
        </>
    );
};

export default PageTemplate;