export default interface TransactionEvent {
    type: TransactionType
    amount: number,
    destination: number,
}

export enum TransactionType {
    Deposit='deposit',
}