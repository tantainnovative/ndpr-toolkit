import React from 'react';
import { DSRRequest } from '../../types/dsr';
export interface DSRTrackerProps {
    /**
     * List of DSR requests to track
     */
    requests: DSRRequest[];
    /**
     * Callback function called when a request is selected
     */
    onSelectRequest?: (requestId: string) => void;
    /**
     * Title displayed on the tracker
     * @default "DSR Request Tracker"
     */
    title?: string;
    /**
     * Description text displayed on the tracker
     * @default "Track the status and progress of data subject requests."
     */
    description?: string;
    /**
     * Custom CSS class for the tracker
     */
    className?: string;
    /**
     * Custom CSS class for the buttons
     */
    buttonClassName?: string;
    /**
     * Whether to show the summary statistics
     * @default true
     */
    showSummaryStats?: boolean;
    /**
     * Whether to show the request type breakdown
     * @default true
     */
    showTypeBreakdown?: boolean;
    /**
     * Whether to show the status breakdown
     * @default true
     */
    showStatusBreakdown?: boolean;
    /**
     * Whether to show the timeline chart
     * @default true
     */
    showTimelineChart?: boolean;
    /**
     * Whether to show the overdue requests
     * @default true
     */
    showOverdueRequests?: boolean;
}
export declare const DSRTracker: React.FC<DSRTrackerProps>;
