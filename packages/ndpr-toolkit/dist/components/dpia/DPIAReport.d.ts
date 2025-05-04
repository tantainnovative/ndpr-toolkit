import React from 'react';
import { DPIAResult, DPIASection } from '../../types/dpia';
export interface DPIAReportProps {
    /**
     * The DPIA result to display
     */
    result: DPIAResult;
    /**
     * The sections of the DPIA questionnaire
     */
    sections: DPIASection[];
    /**
     * Whether to show the full report or just a summary
     * @default true
     */
    showFullReport?: boolean;
    /**
     * Whether to allow printing the report
     * @default true
     */
    allowPrint?: boolean;
    /**
     * Whether to allow exporting the report as PDF
     * @default true
     */
    allowExport?: boolean;
    /**
     * Callback function called when the report is exported
     */
    onExport?: (format: 'pdf' | 'docx' | 'html') => void;
    /**
     * Custom CSS class for the report container
     */
    className?: string;
    /**
     * Custom CSS class for the buttons
     */
    buttonClassName?: string;
}
export declare const DPIAReport: React.FC<DPIAReportProps>;
