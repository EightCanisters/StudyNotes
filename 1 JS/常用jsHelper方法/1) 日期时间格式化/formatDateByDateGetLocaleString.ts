
export function localeDateFilter() {

    return (dateParam: Date | string, dateFormat: string = "medium"): string => {
        if (!dateParam) {
            return;
        }

        let date: Date = typeof dateParam === "string" ? new Date(dateParam) : dateParam;
        let isValidDate: boolean = !isNaN(date.valueOf());

        if (!isValidDate && typeof dateParam === "string") { //dateParam is not a date string
            //simply return the original string
            return dateParam;
        } else if (!isValidDate) { //the dateParam provided is an Invalid Date object
            //invalid argument
            throw new Error("Invalid Date");
        }

        let formatOptions: Intl.DateTimeFormatOptions = getDateTimeFormatOptions(dateFormat);
        let localizedString: string = date.toLocaleString('en-US', formatOptions);
        return localizedString;
    }

    // Supported date formats:
    // medium
    // short
    // fullDate
    // longDate
    // mediumDate
    // shortDate
    // mediumTime
    // shortTime
    function getDateTimeFormatOptions(dateFormat: string): Intl.DateTimeFormatOptions {
        let dateTimeFormatOptions: Intl.DateTimeFormatOptions;

        switch (dateFormat) {
            case "medium":
                dateTimeFormatOptions = {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit"
                }
                break;
            case "short":
                dateTimeFormatOptions = {
                    month: "numeric",
                    day: "numeric",
                    year: "2-digit",
                    hour: "numeric",
                    minute: "2-digit",
                }
                break;
            case "fullDateTime":
                dateTimeFormatOptions = {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                }
                break;
            case "fullDate":
                dateTimeFormatOptions = {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
                break;
            case "longDate":
                dateTimeFormatOptions = {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
                break;
            case "mediumDate":
                dateTimeFormatOptions = {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                }
                break;
            case "mediumShortDate":
                dateTimeFormatOptions = {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric"
                }
                break;
            case "shortDate":
                dateTimeFormatOptions = {
                    month: "numeric",
                    day: "numeric",
                    year: "2-digit"
                }
                break;
            case "mediumTime":
                dateTimeFormatOptions = {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit"
                }
                break;
            case "shortTime":
                dateTimeFormatOptions = {
                    hour: "numeric",
                    minute: "2-digit",
                }
                break;
            default:
                throw new Error("DateFormat not supported: " + dateFormat);
        }

        return dateTimeFormatOptions;
    }


};