import * as React from 'react';
import {useState} from 'react';

import {Button} from '../shared/components/button';
import {ErrorNotice} from '../shared/components/error-notice';
import {ExampleManifests} from '../shared/components/example-manifests';
import {UploadButton} from '../shared/components/upload-button';
import {exampleWorkflowTemplate} from '../shared/examples';
import {WorkflowTemplate} from '../shared/models';
import * as nsUtils from '../shared/namespaces';
import {services} from '../shared/services';
import {WorkflowTemplateEditor} from './workflow-template-editor';

export function WorkflowTemplateCreator({namespace, onCreate}: {namespace: string; onCreate: (workflow: WorkflowTemplate) => void}) {
    const [template, setTemplate] = useState<WorkflowTemplate>(exampleWorkflowTemplate(nsUtils.getNamespaceWithDefault(namespace)));
    const [error, setError] = useState<Error>();
    return (
        <>
            <div>
                <UploadButton onUpload={setTemplate} onError={setError} />
                <Button
                    icon='plus'
                    onClick={async () => {
                        try {
                            const newTemplate = await services.workflowTemplate.create(template, nsUtils.getNamespaceWithDefault(template.metadata.namespace));
                            onCreate(newTemplate);
                        } catch (err) {
                            setError(err);
                        }
                    }}>
                    Create
                </Button>
            </div>
            <ErrorNotice error={error} />
            <WorkflowTemplateEditor template={template} onChange={setTemplate} onError={setError} />
            <p>
                <ExampleManifests />.
            </p>
        </>
    );
}
