/**
 * Possible document status values
 *  * INITIAL => Waiting upload
 *  * INDEXED => File already uploaded, waiting analisis
 *  * ANALYZED => Document already analysed
 *  * INTERNAL_PROCUREMENT => Clear to be internally obtained
 *  * INVALID => Document replaced after refusal
 *  * CLOSED_PROPOSAL_CANCELLATION => Document no longer available after proposal cancellation
 */
export enum ChecklistItemStatus {
  INITIAL = 'INITIAL',
  INDEXED = 'INDEXED',
  ANALYZED = 'ANALYZED',
  INTERNAL_PROCUREMENT = 'INTERNAL_PROCUREMENT',
  INVALID = 'INVALID',
  CLOSED_PROPOSAL_CANCELLATION = 'CLOSED_PROPOSAL_CANCELLATION'
}
