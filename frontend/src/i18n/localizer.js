import React from 'react'

import 'intl-polyfill';
import { negotiateLanguages } from '@fluent/langneg';
import { FluentBundle, FluentResource } from '@fluent/bundle';
import { LocalizationProvider, ReactLocalization } from '@fluent/react';

// A generator function responsible for building the sequence 
// of FluentBundle instances in the order of user's language
// preferences.
async function* generateBundles(userLocales) {
    // Choose locales that are best for the user.
    const currentLocales = negotiateLanguages(
        userLocales,
        ['en-US'],
        { defaultLocale: 'en-US' }
    );

    for (const locale of currentLocales) {
        const bundle = new FluentBundle(locale);

        const res = await fetch('/sample.txt')
        res.text();
        bundle.addResource(new FluentResource(res.text()));
        yield bundle;
    }
}

async function createLocalizer() {
    const bundles = await generateBundles(navigator.languages);
    let l10n = new ReactLocalization(bundles);

    return class Localizer extends React.Component {
        render() {
            return (
                <LocalizationProvider l10n={l10n}>
                    {this.props.children}
                </LocalizationProvider>
            );
        }
    }
}

export { createLocalizer };
