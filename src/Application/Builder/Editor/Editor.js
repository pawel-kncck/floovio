import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { stripTags } from '../../../Utilities/Utilities';

class EditorComponent extends React.Component {

    handleEditorChange = (content, editor) => {
        this.props.transformOutput(content);
    }

    render() {
        return (
            <Editor
                apiKey="i36gbjqh8ydba7ux5zg956l58ckmicfaa8rib2yuv9d3agu6"
                initialValue={this.props.initialContent}
                init={{
                    height: 350,
                    skin: "material-outline",
                    statusbar: false,
                    plugins: 'image table lists template paste',
                    menubar: 'edit view insert table',
                    toolbar: "undo redo | bold italic underline strikethrough | numlist bullist | outdent indent | forecolor removeformat | alignleft aligncenter alignright alignjustify | formatselect | image template",
                    templates: [
                        {title: 'Default', description: 'Default template which shows 3 possible formats', content: '<ol><li>Natalia ma _4_ lata a Paweł ma _32_.</li><li>Magda mieszka w _Gdyni_.</li></ol><table style="width: 100%; height: 42px;" border="1"><tbody><tr style="height: 21px;"><td style="width: 67%; height: 21px;">Tajfun to jamnik</td><td style="width: 33%; height: 21px;">{true}{fałsz}</td></tr><tr style="height: 21px;"><td style="width: 67%; height: 21px;">Warszawa jest super</td><td style="width: 33%; height: 21px;">{prawda}{false}</td></tr></tbody></table><ul><li>[X] Opcja 1</li><li>[X] Opcja 2</li><li>[X] Opcja 3</li></ul>'},
                        {title: 'Fill the gaps', description: 'Fill the gaps type exercise, based on a real exercise from Spanish', content: '<p><span style="color: #ba372a;"><strong>Escoja la opci&oacute;n correcta para completar las siguientes oraciones.</strong></span></p><ol><li style="font-weight: 400;">El doctor le dar&aacute; una _receta_ para comprar el medicamento en la farmacia.&nbsp;</li><li style="font-weight: 400;">Tiene que _pedir cita_ para que el doctor le atienda.&nbsp;</li><li style="font-weight: 400;">Siente mucho calor y est&aacute; sudando porque tiene mucha _fiebre_.</li><li style="font-weight: 400;">La _consulta_ del doctor Aguado empieza a las diez de la ma&ntilde;ana.&nbsp;</li><li style="font-weight: 400;">El doctor Aguado tiene muchos _pacientes_ ;la _sala de espera_ siempre est&aacute; llena.&nbsp;</li><li style="font-weight: 400;">Esta noche no pod&iacute;a dormir porque ten&iacute;a mucha _tos_&nbsp;</li><li style="font-weight: 400;">Pablo se cuida mucho: lleva una _vida saluda_</li><li style="font-weight: 400;">En el hospital la enfermera me _toma la tension_ cada ma&ntilde;ana.</li></ol>'},
                        {title: 'Choose a correct option', description: 'Multi-choice question with four possible answers (more then one answer possible)', content: '<p>Example question:</p><ul><li>[X] Option 1</li><li>[X] Option 2</li><li>[X] Option 3</li><li>[X] Option 4</li></ul>'}
                    ],
                    paste_preprocess: function(plugin, args) {
                        args.content = stripTags( args.content,'li,ol' )
                    },
                    setup: (editor => {
                        editor.on('init', ((e) => {
                            // console.log("Fired from setup function");
                            // this.testFunction();
                            // this.props.isLoaded(true);
                        }));
                    }),    
                }}
                onEditorChange={this.handleEditorChange}
            />
        );
    }
}

export default EditorComponent;