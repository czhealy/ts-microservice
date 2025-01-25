import { Context, EventBridgeEvent, SQSBatchItemFailure, SQSBatchResponse, SQSEvent, SQSHandler, SQSRecord } from "aws-lambda"
import { Logger } from '@aws-lambda-powertools/logger';
const logger = new Logger({ serviceName: 'DeactivationCommandHandler' });
export const commandHandler: SQSHandler = async (event: SQSEvent, _context: Context) => {
    logger.debug('Received event: %j', { ...event })
    const recordHandlePromises: Promise<SQSBatchItemFailure | undefined>[] = []

    for (const record of event.Records) {
        recordHandlePromises.push(handleRecord(record))
    }
    const recordHandleResults = await Promise.all(recordHandlePromises)
    const recordHandleFailures = (await Promise.all(recordHandleResults)).filter(
        (failure) => failure,
    )
    logger.info(
        'SQS handler batch completed.',
        {
            total: recordHandleResults.length,
            failures: recordHandleFailures.length
        }
    )
    return {
        batchItemFailures: recordHandleFailures,
    } as SQSBatchResponse
}
async function handleRecord(record: SQSRecord): Promise<SQSBatchItemFailure | undefined> {
    try {
        const recordBody = JSON.parse(record.body) as EventBridgeEvent<string, unknown>
        logger.info('Handling record: %j', { ...recordBody })
    } catch (e) {
        logger.error('RECORD FAILURE=> Error: %s, Record: %j', { error: e, record: record })
        return {
            itemIdentifier: record.messageId,
        }
    }
}
