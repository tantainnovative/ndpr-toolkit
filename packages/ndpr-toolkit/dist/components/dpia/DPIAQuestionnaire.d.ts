import React from 'react';
import { DPIASection } from '../../types/dpia';
export interface DPIAQuestionnaireProps {
    /**
     * Sections of the DPIA questionnaire
     */
    sections: DPIASection[];
    /**
     * Current answers to the questionnaire
     */
    answers: Record<string, any>;
    /**
     * Callback function called when an answer is updated
     */
    onAnswerChange: (questionId: string, value: any) => void;
    /**
     * Current section index
     */
    currentSectionIndex: number;
    /**
     * Callback function called when user navigates to the next section
     */
    onNextSection?: () => void;
    /**
     * Callback function called when user navigates to the previous section
     */
    onPrevSection?: () => void;
    /**
     * Validation errors for the current section
     */
    validationErrors?: Record<string, string>;
    /**
     * Whether the questionnaire is in read-only mode
     * @default false
     */
    readOnly?: boolean;
    /**
     * Custom CSS class for the questionnaire
     */
    className?: string;
    /**
     * Custom CSS class for the buttons
     */
    buttonClassName?: string;
    /**
     * Text for the next button
     * @default "Next"
     */
    nextButtonText?: string;
    /**
     * Text for the previous button
     * @default "Previous"
     */
    prevButtonText?: string;
    /**
     * Text for the submit button (shown on the last section)
     * @default "Submit"
     */
    submitButtonText?: string;
    /**
     * Whether to show a progress indicator
     * @default true
     */
    showProgress?: boolean;
    /**
     * Current progress percentage (0-100)
     */
    progress?: number;
}
export declare const DPIAQuestionnaire: React.FC<DPIAQuestionnaireProps>;
