import * as React from "react";

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
                    width: "80%"
                }}
            >
                <div style={{  color: "#008B4F", fontSize: "1.25em", fontWeight: "700" }}>DEKRA Expert Migration</div>
                <div style={{ color: "#008B4F", fontSize: "1.25em", fontWeight: "400" }}>Anlage zum Lebenslauf - "Praktische Skills"</div>
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "56px",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80%"
                }}
            >
                <div>Seite {props.pageNum} von {props.totalPages}</div>
                <div>Stand: März 2019</div>
            </div>
        </>
    );
};

export default PageTemplate;