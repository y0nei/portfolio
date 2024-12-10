type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(date: Date, dateStyle: DateStyle = "medium", locale = "en-GB") {
    const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle });
	return dateFormatter.format(new Date(date));
}
