
import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { StyleSheet, css } from "aphrodite";

// Mocking icons/colors for now, assuming fontawesome is available as seen in Header
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/pro-solid-svg-icons";

const UploadFigureModal = ({ isOpen, closeModal }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = () => {
        // Mock upload logic
        alert(`Uploading ${file.name}... (This would connect to API)`);
        closeModal();
        setFile(null);
    };

    return (
        <BaseModal
            isOpen={isOpen}
            closeModal={closeModal}
            title={"Upload Figure"}
            subtitle={"Add a figure to this paper to improve its visibility."}
        >
            <div
                className={css(styles.dropZone, isDragOver && styles.dragOver)}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {file ? (
                    <div className={css(styles.filePreview)}>
                        <FontAwesomeIcon icon={faCloudUpload} className={css(styles.icon)} />
                        <span className={css(styles.text)}>{file.name}</span>
                        <button className={css(styles.removeBtn)} onClick={() => setFile(null)}>
                            Remove
                        </button>
                    </div>
                ) : (
                    <div className={css(styles.placeholder)}>
                        <FontAwesomeIcon icon={faCloudUpload} className={css(styles.icon)} />
                        <span className={css(styles.text)}>
                            Drag & drop or Click to Upload
                        </span>
                    </div>
                )}
            </div>

            <div className={css(styles.footer)}>
                <button
                    className={css(styles.button, styles.cancel)}
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    className={css(styles.button, styles.submit, !file && styles.disabled)}
                    onClick={handleUpload}
                    disabled={!file}
                >
                    Upload Figure
                </button>
            </div>
        </BaseModal>
    );
};

const styles = StyleSheet.create({
    dropZone: {
        width: "100%",
        minHeight: 200,
        border: "2px dashed #ddd",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        transition: "all 0.2s ease-in-out",
        marginTop: 20,
        cursor: "pointer",
    },
    dragOver: {
        borderColor: "#3971ff",
        backgroundColor: "#f0f7ff",
    },
    placeholder: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#aaa",
    },
    filePreview: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#333",
    },
    icon: {
        fontSize: 40,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 500,
    },
    removeBtn: {
        marginTop: 10,
        color: "#ff3939",
        background: "none",
        border: "none",
        cursor: "pointer",
        textDecoration: "underline",
    },
    footer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 30,
        width: "100%",
    },
    button: {
        padding: "10px 20px",
        borderRadius: 4,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 14,
    },
    cancel: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        color: "#666",
        ":hover": {
            backgroundColor: "#f9f9f9",
        },
    },
    submit: {
        backgroundColor: "#3971ff",
        color: "#fff",
        ":hover": {
            backgroundColor: "#2a5dd6",
        },
    },
    disabled: {
        backgroundColor: "#a0b7ea",
        cursor: "not-allowed",
    },
});

export default UploadFigureModal;
