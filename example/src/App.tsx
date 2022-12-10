import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

import { fula } from 'react-native-fula';

const App = () => {
  const [key, setKey] = React.useState<string>('');
  const [value, setValue] = React.useState<string>('');
  const [inprogress, setInprogress] = React.useState<boolean>(false);

  const [initComplete, setInitComplete] = React.useState<[string] | []>([]);

  React.useEffect(() => {
    const initFula = async () => {
      try {
        const privateKey = [
          183, 7, 117, 9, 159, 132, 170, 235, 215, 34, 145, 181, 60, 207, 4, 27,
          27, 17, 17, 167, 100, 89, 157, 218, 73, 200, 183, 145, 104, 151, 204,
          142, 241, 94, 225, 7, 153, 168, 239, 94, 7, 187, 123, 158, 149, 149,
          227, 170, 32, 54, 203, 243, 211, 78, 120, 114, 199, 1, 197, 134, 6,
          91, 87, 152,
        ];
        let f = await fula.init(
          privateKey.toString(),
          '',
          '/ip4/59.23.13.76/tcp/46640/p2p/QmRS9H18XHFrbmGKxi2TEBFz5ZzurkU9cbAwMsRzXcjr5X',
          'noop'
        );
        console.log('initialization result', f);
        return f;
      } catch (e) {
        console.log(e);
        return Promise.reject(e);
      }
    };

    initFula()
      .then((res) => {
        setInitComplete(res);
        console.log('OK', res);
      })
      .catch((e) => {
        console.log('error', e);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text>Put & Get</Text>

        <Button
          title={inprogress ? 'Putting & Getting...' : 'Test'}
          onPress={async () => {
            try {
              /*const jsonvalue = { hello: 'world' };
              const cid =
                'bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea';*/
              const ciduint8 = [
                1, 112, 18, 32, 195, 196, 115, 62, 200, 175, 253, 6, 207, 158,
                159, 245, 15, 252, 107, 205, 46, 200, 90, 97, 112, 0, 75, 183,
                9, 102, 156, 49, 222, 148, 57, 26,
              ];

              if (initComplete) {
                console.log('initialization is completed. putting key/value');
                const res = await fula.put(ciduint8.toString(), '');
                console.log(res);
                console.log('Now fetching key...');
                const res2 = await fula.get(ciduint8.toString());
                console.log(JSON.parse(res2));
                //setBS64(_bs64)
              } else {
                console.log('wait for init to complete');
              }
            } catch (e) {}
          }}
          color={inprogress ? 'green' : 'gray'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageShow: {
    width: 200,
    height: 200,
    padding: 5,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  section: {
    marginTop: 20,
  },
  input: { borderWidth: 1, borderColor: 'gray', marginVertical: 5 },
});

export default App;
