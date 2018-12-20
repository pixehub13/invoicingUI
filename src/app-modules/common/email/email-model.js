class EmailModel {
	constructor(to, from, sender, subject, message, attachments, remoteAttachments) {
		this.to = to;
		this.from = from;
		this.subject = subject;
		this.message = message;
		/**
		 * @type {Array}
		 */
		this.attachments = attachments;
		/**
		 * @type {Array}
		 */
		this.remoteAttachments = remoteAttachments;
	}
}